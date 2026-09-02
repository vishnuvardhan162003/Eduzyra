import { Link } from 'react-router-dom'
import { Star, Clock, Users } from 'lucide-react'
import { formatCurrency, formatDiscount } from '../../utils/format'

export default function CourseCard({ course }) {
  const discount = formatDiscount(course.price, course.originalPrice)

  return (
    <Link
      to={`/courses/${course.id}`}
      className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-navy-50 px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-navy-500">
          {course.code}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-navy-600">
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="eyebrow">{course.category}</span>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-navy-700">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">{course.summary}</p>

        <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {course.students.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-ink">
              {formatCurrency(course.price)}
            </span>
            {discount && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(course.originalPrice)}
              </span>
            )}
          </div>
          {discount && (
            <span className="rounded-full bg-teal-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-teal-700">
              {discount}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
