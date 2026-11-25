import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review-section',
  standalone: true,
  template: `
    <section class="mt-[11px] rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div class="flex items-center justify-between gap-2.5">
        <h3 class="m-0 text-[10px] font-bold text-slate-700">{{ title }}</h3>
        <button type="button" class="rounded px-[5px] py-[3px] text-[8px] font-semibold text-blue-700 hover:bg-blue-50 hover:underline focus-visible:outline-2 focus-visible:outline-blue-400" (click)="edit.emit()" [attr.aria-label]="'Edit ' + editLabel">
          Edit
        </button>
      </div>
      <ng-content></ng-content>
    </section>
  `,
})
export class ReviewSectionComponent {
  @Input() title = '';
  @Input() editLabel = '';
  @Output() readonly edit = new EventEmitter<void>();
}
