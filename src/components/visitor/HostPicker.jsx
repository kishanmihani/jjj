import { HOSTS } from '../../utils/visitors'

export default function HostPicker({ hostId, query, onQueryChange, onSelect }) {
  const matchingHosts = HOSTS.filter((host) => (
    `${host.name} ${host.id}`.toLowerCase().includes(query.trim().toLowerCase())
  ))

  return (
    <div className="mb-[14px]">
      <label className="mb-1.5 block text-[9px] font-semibold text-slate-600" htmlFor="host-search">
        Host employee <span className="text-red-600">*</span>
      </label>
      <div className="relative">
        <span className="absolute top-2 left-2.5 z-10 text-[17px] leading-none text-slate-400" aria-hidden="true">⌕</span>
        <input
          id="host-search"
          className="h-[37px] w-full rounded-[7px] border border-slate-200 bg-white py-0 pr-2.5 pl-[31px] text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100"
          type="search"
          value={query}
          placeholder="Search host by name or employee ID"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="host-options"
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className="mt-[7px] grid gap-[5px]" id="host-options" role="listbox" aria-label="Available hosts">
        {matchingHosts.length ? matchingHosts.map((host) => (
          <button
            type="button"
            className={`flex w-full items-center gap-[9px] rounded-[7px] border px-2 py-[7px] text-left transition focus-visible:outline-2 focus-visible:outline-blue-400 ${hostId === host.id ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            key={host.id}
            role="option"
            aria-selected={hostId === host.id}
            onClick={() => onSelect(host)}
          >
            <span className="grid size-[27px] shrink-0 place-items-center rounded-lg bg-indigo-50 text-[8px] font-bold text-indigo-700" aria-hidden="true">
              {host.name.split(' ').map((part) => part[0]).join('')}
            </span>
            <span className="grid gap-0.5">
              <strong className="text-[9px] font-semibold text-slate-700">{host.name}</strong>
              <small className="text-[8px] text-slate-400">{host.id}</small>
            </span>
            {hostId === host.id && <span className="ml-auto text-xs font-extrabold text-emerald-600" aria-hidden="true">✓</span>}
          </button>
        )) : (
          <p className="m-0 rounded-[7px] border border-dashed border-slate-200 px-[9px] py-[11px] text-[9px] text-slate-500" role="status">
            No hosts found. Try another name or ID.
          </p>
        )}
      </div>
      {hostId && <p className="mt-[5px] text-[8px] leading-snug text-emerald-700">Host selected: {HOSTS.find((host) => host.id === hostId)?.name}</p>}
    </div>
  )
}
