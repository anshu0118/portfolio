function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-violet-500/50 hover:bg-white/[0.07]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">
          {project.title}
        </h3>

        {project.featured && (
          <span className="shrink-0 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300">
            Featured
          </span>
        )}
      </div>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-4 text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-400 transition hover:text-violet-300"
        >
          GitHub →
        </a>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-400 transition hover:text-white"
          >
            Live Demo →
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;