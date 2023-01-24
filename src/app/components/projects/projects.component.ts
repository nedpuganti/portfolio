import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as projectsData from './projects-data';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  currentTab: string;
  currentProjects$ = [];
  currentProject: any = {};

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.currentTab = 'All';
    this.currentProjects$ = projectsData.projects;
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
    this.currentProjects$ = [];
    if (category) {
      this.currentTab = category;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.currentProjects$ = projectsData.projects.filter((el: any) => this.currentTab === el.category);
    } else {
      this.currentTab = 'All';
      this.currentProjects$ = projectsData.projects;
    }
  }
}
