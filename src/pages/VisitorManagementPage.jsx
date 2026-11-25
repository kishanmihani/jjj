import { useState } from 'react'
import AppHeader from '../components/common/AppHeader'
import VisitorBoard from '../components/visitor/VisitorBoard'
import VisitorRegistrationWizard from '../components/visitor/VisitorRegistrationWizard'
import {
  EMPTY_FORM,
  HOSTS,
  STATE_ACTIONS,
  isContactValid,
  isNameValid,
} from '../utils/visitors'

export default function VisitorManagementPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [hostQuery, setHostQuery] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [contactTouched, setContactTouched] = useState(false)
  const [stepTwoTouched, setStepTwoTouched] = useState(false)
  const [visits, setVisits] = useState([])
  const [nextVisitNumber, setNextVisitNumber] = useState(3301)
  const [submissionMessage, setSubmissionMessage] = useState('')

  const nameError = !formData.name.trim()
    ? nameTouched ? 'Full name is required.' : ''
    : !isNameValid(formData.name) ? 'Name needs min 3 characters.' : ''
  const contactError = !formData.contact.trim()
    ? contactTouched ? 'Contact number is required.' : ''
    : !isContactValid(formData.contact)
      ? 'Use 10 digits, optionally prefixed by +91 (a space after +91 is okay).'
      : ''
  const stepOneValid = isNameValid(formData.name) && isContactValid(formData.contact)
  const stepTwoValid = Boolean(formData.purpose && formData.hostId)
  const selectedHost = HOSTS.find((host) => host.id === formData.hostId)

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
    setSubmissionMessage('')
  }

  function handleHostQueryChange(value) {
    setHostQuery(value)
    if (formData.hostId) updateForm('hostId', '')
    setStepTwoTouched(true)
  }

  function selectHost(host) {
    updateForm('hostId', host.id)
    setHostQuery(host.name)
    setStepTwoTouched(true)
  }

  function resetWizard() {
    setFormData(EMPTY_FORM)
    setHostQuery('')
    setStep(1)
    setNameTouched(false)
    setContactTouched(false)
    setStepTwoTouched(false)
  }

  function submitVisit() {
    const visit = {
      id: `V-${nextVisitNumber}`,
      visitor: { name: formData.name.trim(), contact: formData.contact.trim() },
      purpose: formData.purpose,
      hostEmployee: formData.hostId,
      state: 'PENDING',
      createdAt: new Date().toISOString(),
    }
    setVisits((current) => [visit, ...current])
    setNextVisitNumber((current) => current + 1)
    setSubmissionMessage(`${visit.visitor.name} was added to the visitor board as ${visit.id}.`)
    resetWizard()
  }

  function transitionVisit(visitId, nextState) {
    setVisits((current) => current.map((visit) => {
      if (visit.id !== visitId || !STATE_ACTIONS[visit.state].some((action) => action.next === nextState)) {
        return visit
      }
      return { ...visit, state: nextState }
    }))
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_9%_0%,rgba(229,239,255,0.6),transparent_34rem),#f5f7fb] text-slate-700">
      <AppHeader />
      <div className="mx-auto max-w-[1260px] px-3.5 pt-[19px] pb-[22px] sm:px-7 sm:pt-[31px]">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1.5 text-[8px] font-bold tracking-[1.05px] text-slate-500">WELCOME DESK</p>
            <h1 className="m-0 text-[26px] font-bold tracking-[-1px] text-slate-800 sm:text-[31px]">Visitor management</h1>
            <p className="mb-0 mt-1.5 text-[11px] text-slate-500">Register guests and keep their visit status up to date.</p>
          </div>
          <div className="flex items-center gap-[9px] rounded-lg border border-slate-200 bg-white px-[11px] py-2">
            <span className="grid size-[27px] place-items-center rounded-lg bg-blue-50 text-sm text-blue-700" aria-hidden="true">▦</span>
            <span><strong className="block text-[9px] font-bold text-slate-600">Front desk</strong><small className="mt-0.5 block text-[8px] text-slate-400">Visitor check-in</small></span>
          </div>
        </div>

        {submissionMessage && (
          <div className="mb-[14px] flex items-center gap-[9px] rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[10px] text-emerald-800" role="status">
            <span className="text-[13px] font-extrabold" aria-hidden="true">✓</span>
            {submissionMessage}
            <button
              type="button"
              className="ml-auto grid size-[22px] place-items-center rounded text-[17px] hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-600"
              aria-label="Dismiss registration message"
              onClick={() => setSubmissionMessage('')}
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-[17px] lg:grid-cols-[minmax(320px,0.88fr)_minmax(510px,1.55fr)]">
          <VisitorRegistrationWizard
            step={step}
            formData={formData}
            hostQuery={hostQuery}
            nameError={nameError}
            contactError={contactError}
            stepOneValid={stepOneValid}
            stepTwoValid={stepTwoValid}
            stepTwoTouched={stepTwoTouched}
            selectedHost={selectedHost}
            onNameChange={(value) => {
              updateForm('name', value)
              setNameTouched(true)
            }}
            onContactChange={(value) => {
              updateForm('contact', value)
              setContactTouched(true)
            }}
            onPurposeChange={(value) => {
              updateForm('purpose', value)
              setStepTwoTouched(true)
            }}
            onHostQueryChange={handleHostQueryChange}
            onHostSelect={selectHost}
            onContinue={() => setStep((current) => current + 1)}
            onBack={() => setStep((current) => Math.max(1, current - 1))}
            onEditVisitor={() => setStep(1)}
            onEditVisit={() => setStep(2)}
            onSubmit={submitVisit}
          />
          <VisitorBoard visits={visits} onTransition={transitionVisit} />
        </div>

        <footer className="mt-[18px] flex flex-col gap-2 text-[8px] text-slate-400 sm:flex-row sm:justify-between">
          <span>Frontdesk <span className="px-[3px]" aria-hidden="true">·</span> Visitor management</span>
          <span>Visitor information stays in this session</span>
        </footer>
      </div>
    </main>
  )
}
