import { useEffect, useState } from 'react'
import { Radio, FileDown, CalendarClock, ExternalLink, Video } from 'lucide-react'
import { getSessionStatus } from '../../utils/lessonPlan'

function formatSchedule(scheduledAt) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(scheduledAt))
}

function formatCountdown(scheduledAt) {
  const diff = new Date(scheduledAt).getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff / (60 * 60 * 1000)) % 24)
  const minutes = Math.floor((diff / (60 * 1000)) % 60)
  if (days > 0) return `Starts in ${days}d ${hours}h`
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`
  return `Starts in ${minutes}m`
}

const MARK_COMPLETE_HINT = {
  upcoming: "You can mark this complete once the session ends",
  live: "You can mark this complete once the session ends",
}

export default function LiveSessionLesson({ lesson, onComplete, isComplete }) {
  const [, tick] = useState(0)

  // Re-render every 30s so the live/upcoming/ended state and countdown stay fresh.
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30 * 1000)
    return () => clearInterval(id)
  }, [])

  const status = getSessionStatus(lesson.scheduledAt, lesson.durationMinutes)
  const canMarkComplete = isComplete || status === 'ended' || status === null

  return (
    <div className="flex flex-col gap-5">
      <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-navy-900 text-white">
        {status === 'live' && (
          <>
            <span className="flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 font-mono text-xs text-red-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              LIVE NOW
            </span>
            <Radio size={40} className="text-teal-400" />
            <a
              href={lesson.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="btn-accent mt-1 flex items-center gap-2"
            >
              Join session <ExternalLink size={14} />
            </a>
          </>
        )}

        {status === 'upcoming' && (
          <>
            <CalendarClock size={40} className="text-teal-400" />
            <p className="font-display text-sm font-semibold">{formatSchedule(lesson.scheduledAt)}</p>
            <p className="font-mono text-xs text-white/50">{formatCountdown(lesson.scheduledAt)}</p>
            <button type="button" disabled className="btn-primary mt-1 opacity-50">
              Join opens at start time
            </button>
          </>
        )}

        {status === 'ended' && (
          <>
            <Video size={40} className="text-white/40" />
            <p className="font-display text-sm font-semibold text-white/70">Session ended</p>
            <p className="font-mono text-xs text-white/40">
              {formatSchedule(lesson.scheduledAt)} · {lesson.durationMinutes} min
            </p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <FileDown size={16} />
          Session notes & resources.pdf
        </span>
        <button type="button" className="font-display text-xs font-semibold text-navy hover:text-navy-700">
          Download
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onComplete}
          disabled={!canMarkComplete}
          className="btn-primary w-fit disabled:opacity-60"
        >
          {isComplete ? 'Completed' : 'Mark as complete'}
        </button>
        {!canMarkComplete && MARK_COMPLETE_HINT[status] && (
          <span className="font-mono text-xs text-slate-400">{MARK_COMPLETE_HINT[status]}</span>
        )}
      </div>
    </div>
  )
}