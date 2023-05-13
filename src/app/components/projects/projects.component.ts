import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RegisterService } from '@app/services/register.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor, NgIf, AsyncPipe]
})
export class ProjectsComponent implements OnInit {
  modalService = inject(NgbModal);
  registerService = inject(RegisterService);

  projectsData$ = this.registerService.getProjects('');

  currentTab: string;
  currentProject: any = {};

  ngOnInit() {
    this.currentTab = 'All';
  }

  openProjectDetails(modelContent, projectData) {
    this.currentProject = {};
    this.currentProject = { ...projectData };

    this.modalService.open(modelContent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdropClass: 'dark-backdrop'
    });
  }

  getProjects(category = '') {
    if (category) {
      this.currentTab = category;
      this.projectsData$ = this.registerService.getProjects(category);
    } else {
      this.currentTab = 'All';
      this.projectsData$ = this.registerService.getProjects('');
    }
  }
}
