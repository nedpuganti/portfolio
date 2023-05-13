import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class EducationComponent {
  registerService = inject(RegisterService);

  educations$ = this.registerService.getEducations();
}
