export default function ReviewSection({ title, children, onEdit, editLabel }) {
  return (
    <section className="mt-[11px] rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-2.5">
        <h3 className="m-0 text-[10px] font-bold text-slate-700">{title}</h3>
        <button
          type="button"
          className="rounded px-[5px] py-[3px] text-[8px] font-semibold text-blue-700 hover:bg-blue-50 hover:underline focus-visible:outline-2 focus-visible:outline-blue-400"
          onClick={onEdit}
          aria-label={`Edit ${editLabel}`}
        >
          Edit
        </button>
      </div>
      {children}
    </section>
  )
}
