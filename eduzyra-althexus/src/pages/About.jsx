import SectionHeading from '../components/common/SectionHeading'
import { Target, Handshake, Sparkles } from 'lucide-react'

const VALUES = [
  {
    icon: Target,
    title: 'Outcome-scoped, not topic-scoped',
    description:
      'Every course is built backward from one thing you should be able to do by the end — not a syllabus of loosely related topics.',
  },
  {
    icon: Handshake,
    title: 'Mentor review, every checkpoint',
    description:
      'A real person reviews your work at each stage of the path. Feedback loops, not just auto-graded quizzes.',
  },
  {
    icon: Sparkles,
    title: 'Built by people who ship',
    description:
      'Instructors are practitioners at Althexus and partner companies — teaching the workflows they use day to day.',
  },
]

export default function About() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="About Eduzyra"
            title="A studio of Althexus, built for people who learn by shipping"
            description="Eduzyra started as an internal training track at Althexus. We turned it into a course platform because the format worked: short paths, weekly checkpoints, real review."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                <value.icon size={20} />
              </span>
              <h3 className="font-display text-base font-semibold">{value.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Why we built a path, not a video library
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Most course platforms optimize for how many videos you can watch. We optimize for
              how much you can build. Every Eduzyra path compresses the way Althexus teams
              actually ramp up new engineers, designers and analysts — checkpoints, reviews and a
              capstone that mirrors real work.
            </p>
          </div>
          <div className="card-surface flex flex-col gap-5 p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-slate-400">
                Founded
              </span>
              <span className="font-display text-sm font-semibold">2021, as Althexus Academy</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-slate-100 pt-4">
              <span className="font-mono text-xs uppercase tracking-wide text-slate-400">
                Cohorts run
              </span>
              <span className="font-display text-sm font-semibold">140+</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-slate-100 pt-4">
              <span className="font-mono text-xs uppercase tracking-wide text-slate-400">
                Learners
              </span>
              <span className="font-display text-sm font-semibold">19,600+</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
