import ReviewSection from '../common/ReviewSection'
import StepIndicator from '../common/StepIndicator'
import HostPicker from './HostPicker'
import { PURPOSES } from '../../utils/visitors'

const fieldClass = 'h-[37px] w-full rounded-[7px] border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100'
const fieldLabelClass = 'mb-1.5 block text-[9px] font-semibold text-slate-600'
const fieldHintClass = 'mt-[5px] text-[8px] leading-snug text-slate-500'
const fieldErrorClass = 'mt-[5px] text-[8px] leading-snug text-red-700'
const primaryButtonClass = 'inline-flex min-h-[37px] items-center justify-center gap-2 rounded-[7px] bg-blue-600 px-[13px] text-[9px] font-bold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none'
const secondaryButtonClass = 'inline-flex min-h-[37px] items-center justify-center gap-2 rounded-[7px] border border-slate-200 bg-white px-[13px] text-[9px] font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'

export default function VisitorRegistrationWizard({
  step,
  formData,
  hostQuery,
  nameError,
  contactError,
  stepOneValid,
  stepTwoValid,
  stepTwoTouched,
  selectedHost,
  onNameChange,
  onContactChange,
  onPurposeChange,
  onHostQueryChange,
  onHostSelect,
  onContinue,
  onBack,
  onEditVisitor,
  onEditVisit,
  onSubmit,
}) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="wizard-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1.5 text-[8px] font-bold tracking-[1.05px] text-slate-500">NEW REGISTRATION</p>
          <h2 id="wizard-title" className="m-0 text-[17px] font-bold tracking-tight text-slate-800">Register a visitor</h2>
        </div>
        <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-[19px] text-blue-700" aria-hidden="true">＋</span>
      </div>
      <StepIndicator step={step} />

      {step === 1 && (
        <div className="min-h-[340px]">
          <div className="mb-[18px]">
            <span className="text-[8px] font-bold tracking-wide text-slate-500">STEP 1 OF 3</span>
            <h3 className="mb-1 mt-[5px] text-[14px] font-bold text-slate-700">Who’s visiting?</h3>
            <p className="m-0 text-[9px] leading-relaxed text-slate-500">Enter the visitor’s contact details to get started.</p>
          </div>

          <div className="mb-[14px]">
            <label className={fieldLabelClass} htmlFor="visitor-name">Full name <span className="text-red-600">*</span></label>
            <input
              id="visitor-name"
              className={`${fieldClass} ${nameError ? 'border-red-400' : ''}`}
              type="text"
              value={formData.name}
              placeholder="e.g. Priya Sharma"
              autoComplete="name"
              aria-invalid={Boolean(nameError)}
              aria-describedby="name-hint"
              onChange={(event) => onNameChange(event.target.value)}
            />
            <p className={nameError ? fieldErrorClass : fieldHintClass} id="name-hint">
              {nameError || 'Enter the visitor’s full name. Minimum 3 characters.'}
            </p>
          </div>

          <div className="mb-[14px]">
            <label className={fieldLabelClass} htmlFor="visitor-contact">Contact number <span className="text-red-600">*</span></label>
            <input
              id="visitor-contact"
              className={`${fieldClass} ${contactError ? 'border-red-400' : ''}`}
              type="tel"
              value={formData.contact}
              placeholder="+91 9812341234"
              autoComplete="tel"
              aria-invalid={Boolean(contactError)}
              aria-describedby="contact-hint"
              onChange={(event) => onContactChange(event.target.value)}
            />
            <p className={contactError ? fieldErrorClass : fieldHintClass} id="contact-hint">
              {contactError || '10 digits; optional +91 prefix.'}
            </p>
          </div>

          <div className="mt-[22px] flex justify-end">
            <button type="button" className={primaryButtonClass} disabled={!stepOneValid} onClick={onContinue}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="min-h-[340px]">
          <div className="mb-[18px]">
            <span className="text-[8px] font-bold tracking-wide text-slate-500">STEP 2 OF 3</span>
            <h3 className="mb-1 mt-[5px] text-[14px] font-bold text-slate-700">What brings them in?</h3>
            <p className="m-0 text-[9px] leading-relaxed text-slate-500">Choose a visit purpose and the employee they’re meeting.</p>
          </div>

          <div className="mb-[14px]">
            <label className={fieldLabelClass} htmlFor="purpose">Visit purpose <span className="text-red-600">*</span></label>
            <select
              id="purpose"
              className={`${fieldClass} ${stepTwoTouched && !formData.purpose ? 'border-red-400' : ''}`}
              value={formData.purpose}
              aria-invalid={stepTwoTouched && !formData.purpose}
              onChange={(event) => onPurposeChange(event.target.value)}
            >
              <option value="">Select a purpose</option>
              {PURPOSES.map((purpose) => <option value={purpose} key={purpose}>{purpose}</option>)}
            </select>
            {stepTwoTouched && !formData.purpose && <p className={fieldErrorClass}>Choose a visit purpose.</p>}
          </div>

          <HostPicker
            hostId={formData.hostId}
            query={hostQuery}
            onQueryChange={onHostQueryChange}
            onSelect={onHostSelect}
          />
          {stepTwoTouched && !formData.hostId && <p className="-mt-1.5 mb-0 text-[8px] leading-snug text-red-700">Select a host employee.</p>}

          <div className="mt-[22px] flex items-center justify-between gap-2.5">
            <button type="button" className={secondaryButtonClass} onClick={onBack}>← Back</button>
            <button type="button" className={primaryButtonClass} disabled={!stepTwoValid} onClick={onContinue}>
              Review <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="min-h-[340px]">
          <div className="mb-[18px]">
            <span className="text-[8px] font-bold tracking-wide text-slate-500">STEP 3 OF 3</span>
            <h3 className="mb-1 mt-[5px] text-[14px] font-bold text-slate-700">Review visitor details</h3>
            <p className="m-0 text-[9px] leading-relaxed text-slate-500">Check the information before adding the visitor to today’s board.</p>
          </div>

          <ReviewSection title="Visitor" editLabel="visitor details" onEdit={onEditVisitor}>
            <dl className="mt-[11px] grid grid-cols-2 gap-2.5">
              <div><dt className="mb-1 text-[8px] text-slate-400">Full name</dt><dd className="m-0 break-words text-[9px] font-semibold text-slate-700">{formData.name.trim()}</dd></div>
              <div><dt className="mb-1 text-[8px] text-slate-400">Contact</dt><dd className="m-0 break-words text-[9px] font-semibold text-slate-700">{formData.contact.trim()}</dd></div>
            </dl>
          </ReviewSection>
          <ReviewSection title="Visit" editLabel="visit details" onEdit={onEditVisit}>
            <dl className="mt-[11px] grid grid-cols-2 gap-2.5">
              <div><dt className="mb-1 text-[8px] text-slate-400">Purpose</dt><dd className="m-0 text-[9px] font-semibold text-slate-700">{formData.purpose}</dd></div>
              <div><dt className="mb-1 text-[8px] text-slate-400">Host employee</dt><dd className="m-0 text-[9px] font-semibold text-slate-700">{selectedHost?.name} <span className="font-normal text-slate-500">· {selectedHost?.id}</span></dd></div>
            </dl>
          </ReviewSection>

          <div className="mt-[22px] flex items-center justify-between gap-2.5">
            <button type="button" className={secondaryButtonClass} onClick={onBack}>← Back</button>
            <button type="button" className={primaryButtonClass} onClick={onSubmit}>
              Submit registration <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
