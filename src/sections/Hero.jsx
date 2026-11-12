import Aurora from '../components/ui/Aurora';
import RotatingText from '../components/ui/RotatingText';
import FallingText from '../components/ui/FallingText';

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[900px] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Aurora
          colorStops={['#7c3aed', '#4f46e5', '#ffffff']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-black/40 to-black" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-32 text-center">
        {/* Main identity */}
        <h1 className="mb-8 text-6xl font-bold leading-tight text-white sm:text-7xl lg:text-8xl">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Anshuman
          </span>
        </h1>

        {/* Rotating statement */}
        <div className="mb-12 flex w-full items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            <span>I build</span>

            <RotatingText
              texts={[
                'Web Experiences',
                'Full-Stack Apps',
                'Interactive UIs',
                'Digital Products',
              ]}
              mainClassName="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-white" initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              staggerDuration={0}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 350,
              }}
              rotationInterval={2500}
              splitBy="words"
              auto
              loop
            />
          </div>
        </div>

        {/* Interactive description */}
        <div className="mb-12 flex w-full max-w-3xl justify-center text-gray-300">
          <FallingText
            text="I build modern web applications with thoughtful interfaces and reliable backends, turning ideas into polished, responsive digital experiences built for real-world use."
            highlightWords={[
              'modern',
              'thoughtful',
              'reliable',
              'polished',
              'responsive',
            ]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={1}
            fontSize="1.35rem"
            mouseConstraintStiffness={0.2}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-24 text-xs font-medium uppercase tracking-[0.3em] text-white/30">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

export default Hero;