import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Host, PURPOSES, RegistrationForm } from '../../utils/visitors';
import { ReviewSectionComponent } from '../common/review-section.component';
import { StepIndicatorComponent } from '../common/step-indicator.component';
import { HostPickerComponent } from './host-picker.component';

@Component({
  selector: 'app-visitor-registration-wizard',
  standalone: true,
  imports: [CommonModule, HostPickerComponent, ReviewSectionComponent, StepIndicatorComponent],
  templateUrl: './visitor-registration-wizard.component.html',
})
export class VisitorRegistrationWizardComponent {
  @Input() step = 1;
  @Input() formData: RegistrationForm = { name: '', contact: '', purpose: '', hostId: '' };
  @Input() hostQuery = '';
  @Input() nameError = '';
  @Input() contactError = '';
  @Input() stepOneValid = false;
  @Input() stepTwoValid = false;
  @Input() stepTwoTouched = false;
  @Input() selectedHost?: Host;

  @Output() readonly nameChange = new EventEmitter<string>();
  @Output() readonly contactChange = new EventEmitter<string>();
  @Output() readonly purposeChange = new EventEmitter<string>();
  @Output() readonly hostQueryChange = new EventEmitter<string>();
  @Output() readonly hostSelect = new EventEmitter<Host>();
  @Output() readonly continueStep = new EventEmitter<void>();
  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly editVisitor = new EventEmitter<void>();
  @Output() readonly editVisit = new EventEmitter<void>();
  @Output() readonly submitVisit = new EventEmitter<void>();

  readonly purposes = PURPOSES;
}
