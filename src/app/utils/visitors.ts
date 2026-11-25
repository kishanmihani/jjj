export interface Host {
  id: string;
  name: string;
}

export type VisitState =
  | 'PENDING'
  | 'APPROVED'
  | 'DENIED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT';

export interface RegistrationForm {
  name: string;
  contact: string;
  purpose: string;
  hostId: string;
}

export interface Visit {
  id: string;
  visitor: {
    name: string;
    contact: string;
  };
  purpose: string;
  hostEmployee: string;
  state: VisitState;
  createdAt: string;
}

export interface VisitAction {
  next: VisitState;
  label: string;
  style: 'approve' | 'deny' | 'checkin' | 'checkout';
}

export const HOSTS: Host[] = [
  { id: 'EMP-77', name: 'Manish R' },
  { id: 'EMP-31', name: 'Sricharan' },
  { id: 'EMP-52', name: 'Dheeraj S' },
];

export const PURPOSES = ['Meeting', 'Interview', 'Delivery', 'Maintenance'];

export const STATE_ACTIONS: Record<VisitState, VisitAction[]> = {
  PENDING: [
    { next: 'APPROVED', label: 'Approve', style: 'approve' },
    { next: 'DENIED', label: 'Reject', style: 'deny' },
  ],
  APPROVED: [{ next: 'CHECKED_IN', label: 'Check in', style: 'checkin' }],
  CHECKED_IN: [{ next: 'CHECKED_OUT', label: 'Check out', style: 'checkout' }],
  DENIED: [],
  CHECKED_OUT: [],
};

export const EMPTY_FORM: RegistrationForm = {
  name: '',
  contact: '',
  purpose: '',
  hostId: '',
};

const CONTACT_PATTERN = /^(?:\+91\s?)?\d{10}$/;

export function isNameValid(name: string): boolean {
  return name.trim().length >= 3;
}

export function isContactValid(contact: string): boolean {
  return CONTACT_PATTERN.test(contact.trim());
}

export function formatVisitTime(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(value));
}
