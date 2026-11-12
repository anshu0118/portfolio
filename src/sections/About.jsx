import SectionHeading from '../components/ui/SectionHeading';
import profilePic from '../assets/profile.png';

function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="About Me"
          title="Crafting digital experiences"
          description="A developer who cares about both how things look and how they work under the hood."
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="w-full max-w-xl">
            <img
              src={profilePic}
              alt="Anshuman Kar"
              className="w-full h-auto object-contain mask-fade"
            />
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            <p>
              I&apos;m Anshuman Kar, a full stack developer based in India with a
              passion for building web applications that are fast, accessible, and
              user-friendly.
            </p>

            <p>
              My journey started with curiosity about how websites work, and it
              grew into a love for solving real problems with code. I enjoy working
              across the stack — from crafting pixel-perfect UIs to designing robust
              backend APIs.
            </p>

            <p>
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing
              to open source, or refining side projects that push my skills forward.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                Let&apos;s Connect
              </a>

              <a
                href="/resume.pdf"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;