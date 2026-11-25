import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeaderComponent } from '../components/common/app-header.component';
import { VisitorBoardComponent } from '../components/visitor/visitor-board.component';
import { VisitorRegistrationWizardComponent } from '../components/visitor/visitor-registration-wizard.component';
import {
  EMPTY_FORM,
  HOSTS,
  isContactValid,
  isNameValid,
  RegistrationForm,
  STATE_ACTIONS,
  Visit,
  VisitState,
} from '../utils/visitors';

@Component({
  selector: 'app-visitor-management-page',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, VisitorBoardComponent, VisitorRegistrationWizardComponent],
  templateUrl: './visitor-management-page.component.html',
})
export class VisitorManagementPageComponent {
  step = 1;
  formData: RegistrationForm = { ...EMPTY_FORM };
  hostQuery = '';
  nameTouched = false;
  contactTouched = false;
  stepTwoTouched = false;
  visits: Visit[] = [];
  nextVisitNumber = 3301;
  submissionMessage = '';

  get nameError(): string {
    if (!this.formData.name.trim()) {
      return this.nameTouched ? 'Full name is required.' : '';
    }
    return isNameValid(this.formData.name) ? '' : 'Name needs min 3 characters.';
  }

  get contactError(): string {
    if (!this.formData.contact.trim()) {
      return this.contactTouched ? 'Contact number is required.' : '';
    }
    return isContactValid(this.formData.contact)
      ? ''
      : 'Use 10 digits, optionally prefixed by +91 (a space after +91 is okay).';
  }

  get stepOneValid(): boolean {
    return isNameValid(this.formData.name) && isContactValid(this.formData.contact);
  }

  get stepTwoValid(): boolean {
    return Boolean(this.formData.purpose && this.formData.hostId);
  }

  get selectedHost() {
    return HOSTS.find((host) => host.id === this.formData.hostId);
  }

  updateForm(field: keyof RegistrationForm, value: string): void {
    this.formData = { ...this.formData, [field]: value };
    this.submissionMessage = '';
  }

  updateHostQuery(value: string): void {
    this.hostQuery = value;
    if (this.formData.hostId) {
      this.updateForm('hostId', '');
    }
    this.stepTwoTouched = true;
  }

  selectHost(hostId: string): void {
    const host = HOSTS.find((item) => item.id === hostId);
    if (!host) {
      return;
    }
    this.updateForm('hostId', host.id);
    this.hostQuery = host.name;
    this.stepTwoTouched = true;
  }

  continueWizard(): void {
    if (this.step === 1 && this.stepOneValid) {
      this.step = 2;
      return;
    }
    if (this.step === 2 && this.stepTwoValid) {
      this.step = 3;
    }
  }

  back(): void {
    this.step = Math.max(1, this.step - 1);
  }

  submitVisit(): void {
    if (!this.stepOneValid || !this.stepTwoValid || !this.selectedHost) {
      return;
    }

    const visit: Visit = {
      id: `V-${this.nextVisitNumber}`,
      visitor: { name: this.formData.name.trim(), contact: this.formData.contact.trim() },
      purpose: this.formData.purpose,
      hostEmployee: this.formData.hostId,
      state: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    this.visits = [visit, ...this.visits];
    this.nextVisitNumber += 1;
    this.submissionMessage = `${visit.visitor.name} was added to the visitor board as ${visit.id}.`;
    this.resetWizard();
  }

  transitionVisit(event: { visitId: string; nextState: VisitState }): void {
    this.visits = this.visits.map((visit) => {
      const legalAction = STATE_ACTIONS[visit.state].some((action) => action.next === event.nextState);
      if (visit.id !== event.visitId || !legalAction) {
        return visit;
      }
      return { ...visit, state: event.nextState };
    });
  }

  private resetWizard(): void {
    this.formData = { ...EMPTY_FORM };
    this.hostQuery = '';
    this.step = 1;
    this.nameTouched = false;
    this.contactTouched = false;
    this.stepTwoTouched = false;
  }
}
