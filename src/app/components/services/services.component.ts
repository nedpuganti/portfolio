import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RegisterService } from '@app/services/register.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class ServicesComponent {
  registerService = inject(RegisterService);

  services$ = this.registerService.getServices();
}
