import { Link } from 'react-router-dom'
import { Mail, Globe, MessageCircle, Rss } from 'lucide-react'
import Logo from '../common/Logo'
import { BRAND, FOOTER_LINKS } from '../../constants/site'

export default function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-900 text-white">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo variant="light" size="lg" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {BRAND.tagline} A studio of Althexus, building skill-based courses that mirror how
            teams actually work.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-teal hover:text-teal"
              aria-label="Email Eduzyra"
            >
              <Mail size={15} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-teal hover:text-teal"
              aria-label="Eduzyra on LinkedIn"
            >
              <Globe size={15} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-teal hover:text-teal"
              aria-label="Eduzyra on Twitter"
            >
              <MessageCircle size={15} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-teal hover:text-teal"
              aria-label="Eduzyra on YouTube"
            >
              <Rss size={15} />
            </a>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
              {heading}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Eduzyra by Althexus. All rights reserved.</p>
          <p className="font-mono">Made for learners who ship.</p>
        </div>
      </div>
    </footer>
  )
}
