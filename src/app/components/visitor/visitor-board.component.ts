import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatVisitTime, HOSTS, STATE_ACTIONS, Visit, VisitAction, VisitState } from '../../utils/visitors';
import { StateChipComponent } from '../common/state-chip.component';

type BoardFilter = 'ALL' | 'PENDING' | 'ON_PREMISES';

@Component({
  selector: 'app-visitor-board',
  standalone: true,
  imports: [CommonModule, StateChipComponent],
  templateUrl: './visitor-board.component.html',
})
export class VisitorBoardComponent {
  @Input() visits: Visit[] = [];
  @Output() readonly transitionVisit = new EventEmitter<{ visitId: string; nextState: VisitState }>();

  filter: BoardFilter = 'ALL';
  readonly hosts = HOSTS;

  get pendingCount(): number {
    return this.visits.filter((visit) => visit.state === 'PENDING').length;
  }

  get onPremisesCount(): number {
    return this.visits.filter((visit) => visit.state === 'CHECKED_IN').length;
  }

  get visibleVisits(): Visit[] {
    return this.visits.filter((visit) => (
      this.filter === 'ALL'
      || (this.filter === 'PENDING' && visit.state === 'PENDING')
      || (this.filter === 'ON_PREMISES' && visit.state === 'CHECKED_IN')
    ));
  }

  actionsFor(state: VisitState): VisitAction[] {
    return STATE_ACTIONS[state];
  }

  hostName(hostEmployee: string): string {
    return this.hosts.find((host) => host.id === hostEmployee)?.name ?? '';
  }

  visitTime(createdAt: string): string {
    return formatVisitTime(createdAt);
  }

  transition(visitId: string, nextState: VisitState): void {
    this.transitionVisit.emit({ visitId, nextState });
  }
}
