export default function AppHeader() {
  return (
    <header className="flex h-[62px] items-center gap-[18px] border-b border-[#222f46] bg-[#1d2b40] px-5 text-white sm:px-[5vw]">
      <a href="#" className="flex items-center gap-[9px] text-base font-bold tracking-tight text-white no-underline" aria-label="Frontdesk home">
        <span className="grid size-7 place-items-center rounded-lg bg-[#416fe0] font-serif text-xl italic" aria-hidden="true">f</span>
        <span>frontdesk</span>
      </a>
      <span className="ml-[5px] h-[21px] border-l border-[#465267]" aria-hidden="true" />
      <span className="text-[11px] font-medium text-[#c3cada]">Visitor management</span>
      <div className="ml-auto flex items-center gap-[17px]">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#b6c2d7]">
          <span className="text-[13px] text-[#8fa6ca]" aria-hidden="true">◷</span> Today
        </span>
        <span className="grid size-[29px] place-items-center rounded-full border border-[#52617a] bg-[#30425d] text-[9px] font-bold text-[#d7e2f5]" role="img" aria-label="Front desk staff">
          FD
        </span>
      </div>
    </header>
  )
}
