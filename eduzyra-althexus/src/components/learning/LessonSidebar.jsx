import { CircleCheck, Circle, Radio, ListChecks, FileText, CalendarClock } from 'lucide-react'
import { getSessionStatus } from '../../utils/lessonPlan'

const TYPE_ICON = { live: Radio, quiz: ListChecks, assignment: FileText }

const STATUS_STYLES = {
  live: 'bg-red-50 text-red-600',
  upcoming: 'bg-slate-100 text-slate-500',
  ended: 'bg-slate-50 text-slate-400',
}

const STATUS_LABEL = { live: 'Live now', upcoming: 'Upcoming', ended: 'Ended' }

function formatSchedule(scheduledAt) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(scheduledAt))
}

export default function LessonSidebar({ lessons, activeLessonId, completedIds, onSelect }) {
  const modules = []
  lessons.forEach((lesson) => {
    if (!modules[lesson.moduleIndex]) {
      modules[lesson.moduleIndex] = { title: lesson.moduleTitle, lessons: [] }
    }
    modules[lesson.moduleIndex].lessons.push(lesson)
  })

  return (
    <nav className="card-surface flex max-h-[75vh] flex-col overflow-y-auto p-4">
      {modules.map((module, index) => (
        <div key={module.title} className="mb-4 last:mb-0">
          <p className="mb-2 px-2 font-mono text-[11px] uppercase tracking-wide text-slate-400">
            {String(index + 1).padStart(2, '0')} · {module.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {module.lessons.map((lesson) => {
              const Icon = TYPE_ICON[lesson.type]
              const isActive = lesson.id === activeLessonId
              const isDone = completedIds.includes(lesson.id)
              const status = lesson.type === 'live' ? getSessionStatus(lesson.scheduledAt, lesson.durationMinutes) : null

              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(lesson.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                      isActive ? 'bg-navy-50 text-navy' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isDone ? (
                      <CircleCheck size={16} className="shrink-0 text-teal-500" />
                    ) : (
                      <Circle size={16} className="shrink-0 text-slate-300" />
                    )}
                    <Icon size={14} className={`shrink-0 ${status === 'live' ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className="flex-1 truncate">{lesson.title}</span>

                    {status && (
                      <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] ${STATUS_STYLES[status]}`}>
                        {status === 'live' && (
                          <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 align-middle" />
                        )}
                        {STATUS_LABEL[status]}
                      </span>
                    )}

                    {lesson.type === 'live' && status !== 'live' && (
                      <span className="hidden shrink-0 items-center gap-1 font-mono text-[10px] text-slate-400 sm:flex">
                        <CalendarClock size={11} />
                        {formatSchedule(lesson.scheduledAt)}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}