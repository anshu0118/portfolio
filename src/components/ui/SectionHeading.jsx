function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-400">
        {label}
      </p>
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-gray-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
