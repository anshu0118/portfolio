import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const FallingText = ({
  text = '',
  highlightWords = [],
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const floorRef = useRef(null);
  const leftWallRef = useRef(null);
  const rightWallRef = useRef(null);

  const activeWordsRef = useRef(new Map());

  /*
   * Build the normal paragraph.
   */
  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ');

    textRef.current.innerHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.startsWith(hw)
        );

        return `
          <span
            class="falling-word inline-block mx-[2px] select-none ${
              isHighlighted ? 'text-cyan-500 font-bold' : ''
            }"
          >
            ${word}
          </span>
        `;
      })
      .join(' ');
  }, [text, highlightWords]);

  /*
   * Create ONE shared Matter world.
   * Only words that are actually hovered become bodies.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const engine = Matter.Engine.create();

    engine.world.gravity.y = gravity;

    engineRef.current = engine;

    const createBoundaries = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      const oldBoundaries = [
        floorRef.current,
        leftWallRef.current,
        rightWallRef.current,
      ].filter(Boolean);

      if (oldBoundaries.length) {
        Matter.World.remove(engine.world, oldBoundaries);
      }

      /*
       * The bottom portion is the landing area.
       */
      const floorY = height - 38;

      const boundaryOptions = {
        isStatic: true,
        render: {
          visible: false,
        },
      };

      const floor = Matter.Bodies.rectangle(
        width / 2,
        floorY,
        width,
        20,
        boundaryOptions
      );

      const leftWall = Matter.Bodies.rectangle(
        -10,
        height / 2,
        20,
        height,
        boundaryOptions
      );

      const rightWall = Matter.Bodies.rectangle(
        width + 10,
        height / 2,
        20,
        height,
        boundaryOptions
      );

      floorRef.current = floor;
      leftWallRef.current = leftWall;
      rightWallRef.current = rightWall;

      Matter.World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
      ]);
    };

    createBoundaries();

    const runner = Matter.Runner.create();

    runnerRef.current = runner;

    Matter.Runner.run(runner, engine);

    /*
     * THIS is the important part that was missing before.
     *
     * Matter moves the bodies.
     * This loop moves the visible DOM clones to match them.
     */
    const update = () => {
      activeWordsRef.current.forEach((active) => {
        const { body, clone } = active;

        if (!clone) return;

        const { x, y } = body.position;

        clone.style.left = `${x}px`;
        clone.style.top = `${y}px`;
        clone.style.transform =
          `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });

      animationFrameRef.current =
        requestAnimationFrame(update);
    };

    update();

    const resizeObserver = new ResizeObserver(() => {
      createBoundaries();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      activeWordsRef.current.forEach((active) => {
        clearTimeout(active.returnTimer);

        if (active.clone?.parentNode) {
          active.clone.remove();
        }
      });

      activeWordsRef.current.clear();

      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);

      engineRef.current = null;
      runnerRef.current = null;
      floorRef.current = null;
      leftWallRef.current = null;
      rightWallRef.current = null;
    };
  }, [gravity]);

  /*
   * Attach hover behavior to individual words.
   */
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    const wordSpans = [
      ...textElement.querySelectorAll('.falling-word'),
    ];

    const activateWord = (word) => {
      const engine = engineRef.current;

      if (!engine) return;

      /*
       * Don't activate a word that is already falling.
       */
      if (activeWordsRef.current.has(word)) return;

      const containerRect =
        container.getBoundingClientRect();

      const wordRect = word.getBoundingClientRect();

      const startX =
        wordRect.left -
        containerRect.left +
        wordRect.width / 2;

      const startY =
        wordRect.top -
        containerRect.top +
        wordRect.height / 2;

      /*
       * Create a visible copy.
       */
      const clone = word.cloneNode(true);

      clone.style.position = 'absolute';
      clone.style.left = `${startX}px`;
      clone.style.top = `${startY}px`;
      clone.style.width = `${wordRect.width}px`;
      clone.style.height = `${wordRect.height}px`;
      clone.style.margin = '0';
      clone.style.zIndex = '20';
      clone.style.pointerEvents = 'none';
      clone.style.opacity = '1';
      clone.style.transition = 'none';
      clone.style.transform =
        'translate(-50%, -50%) rotate(0deg)';

      container.appendChild(clone);

      /*
       * Hide ONLY the original hovered word.
       */
      word.style.visibility = 'hidden';

      /*
       * Create the physical body.
       */
      const body = Matter.Bodies.rectangle(
        startX,
        startY,
        wordRect.width,
        wordRect.height,
        {
          restitution: 0.12,
          friction: 0.75,
          frictionAir: 0.025,
          density: 0.002,
          chamfer: {
            radius: 2,
          },
        }
      );

      /*
       * Mostly downward.
       * Tiny horizontal variation prevents every word
       * from landing on exactly the same spot.
       */
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.8,
        y: 1,
      });

      Matter.Body.setAngularVelocity(
        body,
        (Math.random() - 0.5) * 0.02
      );

      Matter.World.add(engine.world, body);

      const active = {
        body,
        clone,
        returnTimer: null,
      };

      activeWordsRef.current.set(word, active);

      /*
       * Let the word fall, settle and remain there.
       */
      active.returnTimer = setTimeout(() => {
        const current =
          activeWordsRef.current.get(word);

        if (!current || !engineRef.current) return;

        /*
         * Remove the physical body from the pile.
         */
        Matter.World.remove(
          engineRef.current.world,
          current.body
        );

        /*
         * Fade the fallen copy out.
         */
        current.clone.style.transition =
          'opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';

        current.clone.style.opacity = '0';
        current.clone.style.transform =
          'translate(-50%, -50%) scale(0.75)';

        /*
         * Once the fallen copy disappears,
         * restore the original word.
         */
        setTimeout(() => {
          if (current.clone.parentNode) {
            current.clone.remove();
          }

          word.style.visibility = 'visible';
          word.style.opacity = '0';
          word.style.transform =
            'translateY(8px) scale(0.96)';
          word.style.transition =
            'opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';

          requestAnimationFrame(() => {
            word.style.opacity = '1';
            word.style.transform =
              'translateY(0) scale(1)';
          });

          setTimeout(() => {
            word.style.transition = '';
            word.style.opacity = '';
            word.style.transform = '';

            activeWordsRef.current.delete(word);
          }, 450);
        }, 300);
      }, 1700);
    };

    const handlers = wordSpans.map((word) => {
      const handler = () => {
        if (trigger === 'hover') {
          activateWord(word);
        }
      };

      word.addEventListener('pointerenter', handler);

      return {
        word,
        handler,
      };
    });

    return () => {
      handlers.forEach(({ word, handler }) => {
        word.removeEventListener(
          'pointerenter',
          handler
        );
      });
    };
  }, [text, highlightWords, trigger, mouseConstraintStiffness]);

  return (
    <div
      ref={containerRef}
      className="relative z-[1] h-[210px] w-full cursor-default overflow-hidden"
      style={{
        backgroundColor,
      }}
    >
      <div
        ref={textRef}
        className="relative z-[2] mx-auto flex w-full max-w-5xl flex-wrap justify-center text-center"
        style={{
          fontSize,
          lineHeight: 1.5,
        }}
      />
    </div>
  );
};

export default FallingText;