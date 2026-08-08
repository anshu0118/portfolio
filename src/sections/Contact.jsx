import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';

const initialForm = { name: '', email: '', subject: '', message: '' };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({ type: 'success', message: data.message });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Contact"
          title="Let's work together"
          description="Have a project in mind or just want to say hi? Send me a message."
        />

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 font-semibold text-white">Email</h3>
              <a
                href="mailto:anshuman@example.com"
                className="text-gray-400 transition hover:text-violet-400"
              >
                anshuman@example.com
              </a>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">Location</h3>
              <p className="text-gray-400">India</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">Availability</h3>
              <p className="text-gray-400">Open to freelance & full-time roles</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-gray-400">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm text-gray-400">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-500"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-500"
                placeholder="Tell me about your project..."
              />
            </div>

            {status.message && (
              <p
                className={`text-sm ${
                  status.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
