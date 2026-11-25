export const HOSTS = [
  { id: 'EMP-77', name: 'Manish R' },
  { id: 'EMP-31', name: 'Sricharan' },
  { id: 'EMP-52', name: 'Dheeraj S' },
]

export const PURPOSES = ['Meeting', 'Interview', 'Delivery', 'Maintenance']

export const STATE_ACTIONS = {
  PENDING: [
    { next: 'APPROVED', label: 'Approve', style: 'approve' },
    { next: 'DENIED', label: 'Reject', style: 'deny' },
  ],
  APPROVED: [{ next: 'CHECKED_IN', label: 'Check in', style: 'checkin' }],
  CHECKED_IN: [{ next: 'CHECKED_OUT', label: 'Check out', style: 'checkout' }],
  DENIED: [],
  CHECKED_OUT: [],
}

export const EMPTY_FORM = { name: '', contact: '', purpose: '', hostId: '' }

const CONTACT_PATTERN = /^(?:\+91\s?)?\d{10}$/

export function isNameValid(name) {
  return name.trim().length >= 3
}

export function isContactValid(contact) {
  return CONTACT_PATTERN.test(contact.trim())
}

export function formatVisitTime(value) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(value))
}
