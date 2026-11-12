const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anshu0118' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anshuman-kar-bb8208279/' },
  { label: 'Email', href: 'mailto:anshumankar575@gmail.com' },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-gray-500">
          Built by Anshuman Kar
        </p>

        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="text-sm text-gray-400 transition hover:text-violet-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;