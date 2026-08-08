import SectionHeading from '../components/ui/SectionHeading';
import { experience, education } from '../data/experience';

function Experience() {
  return (
    <section id="experience" className="border-y border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Experience"
          title="Where I've been"
          description="My professional journey and education background."
        />

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Work</h3>
            <div className="space-y-6">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-white">{item.role}</h4>
                    <span className="text-sm text-violet-400">{item.period}</span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-gray-300">
                    {item.company}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Education</h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-white">{item.degree}</h4>
                    <span className="text-sm text-violet-400">{item.period}</span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-gray-300">
                    {item.school}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
