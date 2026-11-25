import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ol class="my-[21px] grid grid-cols-[1fr_1fr_0.85fr] list-none p-0" aria-label="Registration steps">
      <li *ngFor="let item of steps; let index = index" class="relative flex min-w-0 items-center gap-1.5" [attr.aria-current]="step === item.number ? 'step' : null">
        <span *ngIf="index < steps.length - 1" class="absolute top-3 right-[7px] left-[30px] h-px" [class.bg-emerald-300]="step > item.number" [class.bg-slate-200]="step <= item.number" aria-hidden="true"></span>
        <span class="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border text-[9px] font-bold"
          [class.border-emerald-600]="step > item.number" [class.bg-emerald-600]="step > item.number" [class.text-white]="step > item.number"
          [class.border-blue-600]="step === item.number" [class.bg-blue-600]="step === item.number" [class.ring-2]="step === item.number" [class.ring-blue-100]="step === item.number"
          [class.border-slate-200]="step < item.number" [class.bg-white]="step < item.number" [class.text-slate-400]="step < item.number">
          {{ step > item.number ? '✓' : item.number }}
        </span>
        <span class="relative z-10 truncate bg-white pr-1 text-[8px] font-semibold" [class.text-blue-800]="step === item.number" [class.text-slate-400]="step !== item.number">{{ item.title }}</span>
      </li>
    </ol>
  `,
})
export class StepIndicatorComponent {
  @Input() step = 1;

  readonly steps = [
    { number: 1, title: 'Visitor details' },
    { number: 2, title: 'Visit details' },
    { number: 3, title: 'Review' },
  ];
}
