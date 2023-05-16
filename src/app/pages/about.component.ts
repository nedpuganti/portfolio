import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicesComponent } from '../components/services.component';
import { PersonalinfoComponent } from '../components/personalinfo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  template: `
    <app-personalinfo></app-personalinfo>
    <app-services></app-services>
  `,
  styles: [],
  standalone: true,
  imports: [RouterLink, PersonalinfoComponent, ServicesComponent]
})
export class AboutComponent implements OnInit {
  @Input()
  title1: string;

  @Input()
  title2: string;

  @Input()
  pageId: string;

  @Output() pageData: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.getDetailPageData();
  }

  getDetailPageData() {
    this.pageData.emit({
      title1: this.title1,
      title2: this.title2,
      pageId: this.pageId
    });
  }
}
