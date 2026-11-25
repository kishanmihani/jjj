import { Component } from '@angular/core';
import { VisitorManagementPageComponent } from './pages/visitor-management-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VisitorManagementPageComponent],
  template: '<app-visitor-management-page />',
})
export class App {}
