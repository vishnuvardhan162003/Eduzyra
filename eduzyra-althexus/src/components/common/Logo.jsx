import { Link } from 'react-router-dom'

const SIZES = {
  md: {
    mark: 'h-11 w-11 rounded-xl text-xl',
    wordmark: 'text-xl',
    sub: 'text-[10px] tracking-[0.18em]',
    gap: 'gap-3',
  },
  lg: {
    mark: 'h-14 w-14 rounded-2xl text-2xl',
    wordmark: 'text-2xl',
    sub: 'text-[11px] tracking-[0.2em]',
    gap: 'gap-3.5',
  },
}

export default function Logo({ variant = 'dark', size = 'md' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink'
  const subColor = variant === 'light' ? 'text-white/55' : 'text-slate-500'
  const s = SIZES[size] ?? SIZES.md

  return (
    <Link to="/" className={`group flex items-center ${s.gap}`}>
      <span
        className={`relative flex shrink-0 items-center justify-center ${s.mark} bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 font-display font-bold text-teal-300 shadow-sm ring-1 ring-white/10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:ring-teal-400/40`}
      >
        E
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-teal-400 sm:h-3.5 sm:w-3.5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-tight ${s.wordmark} ${textColor}`}>
          Eduzyra
        </span>
        <span className={`mt-1 font-mono uppercase ${s.sub} ${subColor}`}>by Althexus</span>
      </span>
    </Link>
  )
}
