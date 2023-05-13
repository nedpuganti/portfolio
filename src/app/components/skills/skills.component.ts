import { Component, inject } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgFor } from '@angular/common';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [NgFor, NgbProgressbar, AsyncPipe]
})
export class SkillsComponent {
  registerService = inject(RegisterService);

  hardSkills$ = this.registerService.getHardSkills();
  softSkills$ = this.registerService.getSoftSkills();
}
