import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openScrollableContent(longContent) {
    this.modalService.open(longContent, {
      size: 'lg',
      scrollable: true,
      centered: true
    });
  }
}
