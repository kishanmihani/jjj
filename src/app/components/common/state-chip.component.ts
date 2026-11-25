import { Component, Input } from '@angular/core';
import { VisitState } from '../../utils/visitors';

const STATE_STYLES: Record<VisitState, string> = {
  PENDING: 'border-amber-200 bg-amber-50 text-amber-700',
  APPROVED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  DENIED: 'border-red-200 bg-red-50 text-red-700',
  CHECKED_IN: 'border-blue-200 bg-blue-50 text-blue-700',
  CHECKED_OUT: 'border-slate-200 bg-slate-100 text-slate-600',
};

@Component({
  selector: 'app-state-chip',
  standalone: true,
  template: `
    <span class="inline-flex min-h-5 items-center justify-center whitespace-nowrap rounded-full border px-[7px] py-1 text-[7px] font-bold leading-none tracking-[0.15px]"
      [class]="stateStyle" [attr.aria-label]="'Visitor state: ' + stateLabel">
      {{ stateLabel }}
    </span>
  `,
})
export class StateChipComponent {
  @Input({ required: true }) state!: VisitState;

  get stateStyle(): string {
    return STATE_STYLES[this.state];
  }

  get stateLabel(): string {
    return this.state.replace('_', ' ');
  }
}
