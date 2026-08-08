import Aurora from '../components/ui/Aurora';

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Aurora
          colorStops={['#7c3aed', '#4f46e5', '#ffffff']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-300">
          Full Stack Developer
        </p>
        <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight text-white sm:text-7xl">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Anshuman
          </span>
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-300">
          I build modern, performant web applications with clean code and
          thoughtful design. Passionate about turning ideas into polished digital
          experiences.
        </p>

        <div className="flex flex-wrap gap-4">
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
      </div>
    </section>
  );
}

export default Hero;
