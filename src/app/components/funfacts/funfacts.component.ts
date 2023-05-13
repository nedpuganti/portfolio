import { Component, inject } from '@angular/core';
import { RegisterService } from '@app/services/register.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-funfacts',
  templateUrl: './funfacts.component.html',
  styleUrls: ['./funfacts.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class FunfactsComponent {
  registerService = inject(RegisterService);

  funFacts$ = this.registerService.getFunFacts();
}
