import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class ExperienceComponent {
  registerService = inject(RegisterService);

  experiences$ = this.registerService.getExperiences();
}
