import { Component, input } from '@angular/core';

import { ServiceItem } from '../../../core/models';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceItem>();
}
