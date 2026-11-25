const STEPS = [
  { number: 1, title: 'Visitor details' },
  { number: 2, title: 'Visit details' },
  { number: 3, title: 'Review' },
]

export default function StepIndicator({ step }) {
  return (
    <ol className="my-[21px] grid grid-cols-[1fr_1fr_0.85fr] list-none p-0" aria-label="Registration steps">
      {STEPS.map((item, index) => {
        const complete = step > item.number
        const current = step === item.number
        return (
          <li className="relative flex min-w-0 items-center gap-1.5" key={item.number} aria-current={current ? 'step' : undefined}>
            {index < STEPS.length - 1 && (
              <span className={`absolute top-3 right-[7px] left-[30px] h-px ${complete ? 'bg-emerald-300' : 'bg-slate-200'}`} aria-hidden="true" />
            )}
            <span className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full border text-[9px] font-bold ${complete ? 'border-emerald-600 bg-emerald-600 text-white' : current ? 'border-blue-600 bg-blue-600 text-white ring-[3px] ring-blue-100' : 'border-slate-200 bg-white text-slate-400'}`}>
              {complete ? '✓' : item.number}
            </span>
            <span className={`relative z-10 truncate bg-white pr-1 text-[8px] font-semibold ${current ? 'text-blue-800' : 'text-slate-400'}`}>
              {item.title}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
