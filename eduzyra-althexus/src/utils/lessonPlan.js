const MINUTE = 60 * 1000

// Derives whether a live session is upcoming, currently live, or ended,
// based on its scheduled start time and duration.
export function getSessionStatus(scheduledAt, durationMinutes) {
  if (!scheduledAt) return null
  const start = new Date(scheduledAt).getTime()
  const end = start + durationMinutes * MINUTE
  const now = Date.now()
  if (now < start) return 'upcoming'
  if (now <= end) return 'live'
  return 'ended'
}

// Generates a lesson list from a course's syllabus so the LMS player has
// something concrete to render without needing a full per-lesson dataset.
// Replace this with real lesson content coming from the backend once the
// content management system is in place — LessonSidebar/CoursePlayer only
// depend on the shape below.
export function buildLessonPlan(course) {
  const lessons = []
  let counter = 0
  const now = Date.now()

  course.syllabus.forEach((module, moduleIndex) => {
    for (let i = 0; i < module.lessons; i += 1) {
      counter += 1
      const isLastOfModule = i === module.lessons - 1
      const isLastModule = moduleIndex === course.syllabus.length - 1

      let type = 'live'
      if (isLastOfModule && isLastModule) type = 'assignment'
      else if (isLastOfModule) type = 'quiz'

      const durationMinutes = type === 'live' ? 45 + ((counter * 5) % 30) : null
      // Demo spread: some sessions in the past, one live "now", rest upcoming.
      const scheduledAt =
        type === 'live'
          ? new Date(now + (counter - 3) * 2 * 24 * 60 * MINUTE).toISOString()
          : null

      lessons.push({
        id: `lesson-${counter}`,
        moduleTitle: module.title,
        moduleIndex,
        title: `${module.title} — Session ${i + 1}`,
        type,
        durationMinutes,
        scheduledAt,
        meetingLink:
          type === 'live'
            ? `https://meet.eduzyra.live/${(course.code ?? 'session').toLowerCase()}-${counter}`
            : null,
      })
    }
  })

  return lessons
}