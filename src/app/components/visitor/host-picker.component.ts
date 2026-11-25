import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HOSTS, Host } from '../../utils/visitors';

@Component({
  selector: 'app-host-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-[14px]">
      <label class="mb-1.5 block text-[9px] font-semibold text-slate-600" for="host-search">
        Host employee <span class="text-red-600">*</span>
      </label>
      <div class="relative">
        <span class="absolute top-2 left-2.5 z-10 text-[17px] leading-none text-slate-400" aria-hidden="true">⌕</span>
        <input id="host-search" class="h-[37px] w-full rounded-[7px] border border-slate-200 bg-white py-0 pr-2.5 pl-[31px] text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100"
          type="search" [value]="query" placeholder="Search host by name or employee ID" autocomplete="off" aria-autocomplete="list" aria-controls="host-options"
          (input)="queryChange.emit($any($event.target).value)" />
      </div>
      <div class="mt-[7px] grid gap-[5px]" id="host-options" role="listbox" aria-label="Available hosts">
        <button *ngFor="let host of matchingHosts" type="button"
          class="flex w-full items-center gap-[9px] rounded-[7px] border px-2 py-[7px] text-left transition focus-visible:outline-2 focus-visible:outline-blue-400"
          [class.border-blue-200]="hostId === host.id" [class.bg-blue-50]="hostId === host.id"
          [class.border-slate-200]="hostId !== host.id" [class.bg-white]="hostId !== host.id" hover:bg-slate-50
          role="option" [attr.aria-selected]="hostId === host.id" (click)="hostSelect.emit(host)">
          <span class="grid size-[27px] shrink-0 place-items-center rounded-lg bg-indigo-50 text-[8px] font-bold text-indigo-700" aria-hidden="true">
            {{ initials(host.name) }}
          </span>
          <span class="grid gap-0.5">
            <strong class="text-[9px] font-semibold text-slate-700">{{ host.name }}</strong>
            <small class="text-[8px] text-slate-400">{{ host.id }}</small>
          </span>
          <span *ngIf="hostId === host.id" class="ml-auto text-xs font-extrabold text-emerald-600" aria-hidden="true">✓</span>
        </button>
        <p *ngIf="matchingHosts.length === 0" class="m-0 rounded-[7px] border border-dashed border-slate-200 px-[9px] py-[11px] text-[9px] text-slate-500" role="status">
          No hosts found. Try another name or ID.
        </p>
      </div>
      <p *ngIf="hostId" class="mt-[5px] text-[8px] leading-snug text-emerald-700">Host selected: {{ selectedHostName }}</p>
    </div>
  `,
})
export class HostPickerComponent {
  @Input() hostId = '';
  @Input() query = '';
  @Output() readonly queryChange = new EventEmitter<string>();
  @Output() readonly hostSelect = new EventEmitter<Host>();

  readonly hosts = HOSTS;

  get matchingHosts(): Host[] {
    const query = this.query.trim().toLowerCase();
    return this.hosts.filter((host) => `${host.name} ${host.id}`.toLowerCase().includes(query));
  }

  get selectedHostName(): string {
    return this.hosts.find((host) => host.id === this.hostId)?.name ?? '';
  }

  initials(name: string): string {
    return name.split(' ').map((part) => part[0]).join('');
  }
}
