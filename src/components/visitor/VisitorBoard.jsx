import { useMemo, useState } from 'react'
import StateChip from '../common/StateChip'
import { HOSTS, STATE_ACTIONS, formatVisitTime } from '../../utils/visitors'

const ACTION_STYLES = {
  approve: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  deny: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
  checkin: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
  checkout: 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200',
}

function BoardTab({ active, children, count, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-px pb-[9px] text-[9px] font-semibold transition focus-visible:outline-2 focus-visible:outline-blue-500 ${active ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
      onClick={onClick}
    >
      {children}
      <span className={`grid min-w-[17px] h-[17px] place-items-center rounded-xl px-1 text-[8px] tabular-nums ${active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    </button>
  )
}

function VisitorRow({ visit, onTransition }) {
  const actions = STATE_ACTIONS[visit.state]
  const host = HOSTS.find((item) => item.id === visit.hostEmployee)

  return (
    <tr>
      <td className="px-2 py-2.5 align-middle text-[9px] text-slate-600">
        <strong className="block text-[9px] font-semibold text-slate-700">{visit.visitor.name}</strong>
        <span className="mt-[3px] block whitespace-nowrap text-[8px] text-slate-500">{visit.visitor.contact}</span>
        <span className="mt-1 block whitespace-nowrap text-[7px] text-slate-400">{visit.id} · {formatVisitTime(visit.createdAt)}</span>
      </td>
      <td className="px-2 py-2.5 align-middle text-[9px] text-slate-600">
        <strong className="block text-[9px] font-semibold text-slate-700">{visit.purpose}</strong>
        <span className="mt-1 block whitespace-nowrap text-[8px] text-slate-500">{visit.hostEmployee} · {host?.name}</span>
      </td>
      <td className="px-2 py-2.5 align-middle"><StateChip state={visit.state} /></td>
      <td className="px-2 py-2.5 align-middle">
        <div className="flex min-w-[94px] flex-wrap gap-[5px]">
          {actions.length ? actions.map((action) => (
            <button
              type="button"
              className={`min-h-[25px] whitespace-nowrap rounded border px-[7px] text-[7px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${ACTION_STYLES[action.style]}`}
              key={action.next}
              onClick={() => onTransition(visit.id, action.next)}
            >
              {action.label}
            </button>
          )) : <span className="pl-1 text-[10px] text-slate-400" aria-label="No available actions">—</span>}
        </div>
      </td>
    </tr>
  )
}

export default function VisitorBoard({ visits, onTransition }) {
  const [filter, setFilter] = useState('ALL')
  const pendingCount = visits.filter((visit) => visit.state === 'PENDING').length
  const onPremisesCount = visits.filter((visit) => visit.state === 'CHECKED_IN').length
  const visibleVisits = useMemo(() => visits.filter((visit) => (
    filter === 'ALL'
    || (filter === 'PENDING' && visit.state === 'PENDING')
    || (filter === 'ON_PREMISES' && visit.state === 'CHECKED_IN')
  )), [filter, visits])

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="board-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1.5 text-[8px] font-bold tracking-[1.05px] text-slate-500">TODAY</p>
          <h2 id="board-title" className="m-0 text-[17px] font-bold tracking-tight text-slate-800">Visitor status board</h2>
          <p className="mb-0 mt-[5px] text-[9px] text-slate-500">Manage approvals and track who is on site.</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-[9px] py-1.5 text-[8px] font-semibold text-slate-600">
          {visits.length} {visits.length === 1 ? 'visitor' : 'visitors'}
        </span>
      </div>

      <div className="mt-[18px] flex gap-[17px] border-b border-slate-200" role="tablist" aria-label="Filter visitors">
        <BoardTab active={filter === 'ALL'} count={visits.length} onClick={() => setFilter('ALL')}>All</BoardTab>
        <BoardTab active={filter === 'PENDING'} count={pendingCount} onClick={() => setFilter('PENDING')}>Pending</BoardTab>
        <BoardTab active={filter === 'ON_PREMISES'} count={onPremisesCount} onClick={() => setFilter('ON_PREMISES')}>On premises</BoardTab>
      </div>

      {visibleVisits.length ? (
        <div className="mt-[13px] overflow-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-left max-[600px]:min-w-[570px]">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="whitespace-nowrap px-2 py-[9px] text-[8px] font-bold text-slate-500">Visitor</th>
                <th scope="col" className="whitespace-nowrap px-2 py-[9px] text-[8px] font-bold text-slate-500">Purpose / host</th>
                <th scope="col" className="whitespace-nowrap px-2 py-[9px] text-[8px] font-bold text-slate-500">Status</th>
                <th scope="col" className="whitespace-nowrap px-2 py-[9px] text-[8px] font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr+tr>td]:border-t [&>tr+tr>td]:border-slate-100">
              {visibleVisits.map((visit) => <VisitorRow key={visit.id} visit={visit} onTransition={onTransition} />)}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-[13px] grid min-h-[228px] content-center justify-items-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-center" role="status">
          <span className="mb-2 grid size-[38px] place-items-center rounded-xl bg-slate-100 text-lg text-slate-500" aria-hidden="true">▦</span>
          <h3 className="m-0 text-[11px] font-semibold text-slate-700">{visits.length ? 'No visitors in this view' : 'No visitors registered yet'}</h3>
          <p className="mb-0 mt-[5px] max-w-[220px] text-[8px] leading-relaxed text-slate-500">
            {visits.length ? 'Try another status tab.' : 'Complete the registration form to add today’s first visitor.'}
          </p>
        </div>
      )}
    </section>
  )
}
