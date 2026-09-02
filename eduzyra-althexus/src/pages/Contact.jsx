import { useState } from 'react'
import { Mail, MapPin, Phone, CircleCheck } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { BRAND } from '../constants/site'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to the Eduzyra team"
        description="Questions about a course, a cohort, or partnering with Althexus — write to us and a mentor will get back within one business day."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-5">
          <div className="card-surface flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <Mail size={18} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-slate-400">Email</p>
              <p className="font-display text-sm font-semibold">{BRAND.supportEmail}</p>
            </div>
          </div>
          <div className="card-surface flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <Phone size={18} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-slate-400">Phone</p>
              <p className="font-display text-sm font-semibold">+91 80 4567 1290</p>
            </div>
          </div>
          <div className="card-surface flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <MapPin size={18} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-slate-400">Studio</p>
              <p className="font-display text-sm font-semibold">Bengaluru, India</p>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CircleCheck size={32} className="text-teal-500" />
              <p className="font-display text-lg font-semibold">Message sent</p>
              <p className="text-sm text-slate-500">
                Thanks, {form.name.split(' ')[0] || 'there'} — we will reply at {form.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-display text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-display text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-display text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                  placeholder="Tell us what you need"
                />
              </div>
              <button type="submit" className="btn-primary mt-2">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
