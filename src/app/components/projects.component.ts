import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AppService } from '@app/app.service';
import { Observable } from 'rxjs';
import { Project } from '@app/interfaces/project.interface';
@Component({
  selector: 'pfo-projects',
  template: `
    <!-- Projects Starts -->
    <div id="projects">
      <!-- Projects Heading Starts -->
      <h5>Projects</h5>
      <!-- Projects Heading Ends -->
      <div class="row no-gutters">
        <!-- Portfolio Filter Starts -->
        <div class="portfolio-filter col-12">
          <ul>
            <!-- Single Filter Starts -->
            <li>
              <a href="javascript:void(0);" [ngClass]="currentTab === 'All' ? 'current' : ''" (click)="getProjects()">All Projects</a>
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a href="javascript:void(0);" [ngClass]="currentTab === 'Mobile' ? 'current' : ''" (click)="getProjects('Mobile')"
                >Mobile Apps</a
              >
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a href="javascript:void(0);" [ngClass]="currentTab === 'Website' ? 'current' : ''" (click)="getProjects('Website')"
                >Websites</a
              >
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a href="javascript:void(0);" [ngClass]="currentTab === 'Portal' ? 'current' : ''" (click)="getProjects('Portal')">Portals</a>
            </li>
            <!-- Single Filter Ends -->
          </ul>
        </div>
        <!-- Portfolio Filter Ends -->
        <!-- Portfolio Item Starts -->
        <div class="portfolio-item col-12">
          <div class="item-wrapper row">
            <!-- Single Item Starts -->
            <div class="item web-templates col-md-4 col-sm-6 col-12" *ngFor="let item of projectsData$ | async">
              <!-- Image Starts -->
              <div class="image">
                <img *ngIf="item.image !== null" [src]="item.image" alt="Data Landing Page" height="226" />
              </div>
              <!-- Image Ends -->
              <!-- Overlay Starts -->
              <div class="overlay">
                <!-- View More (Button) Starts -->
                <a class="view-more" (click)="openProjectDetails(modelContent, item)">
                  <span class="front">
                    <i class="far fa-eye"></i><span class="value">View <span>More</span></span>
                  </span>
                  <span class="back">
                    <i class="far fa-eye"></i><span class="value">View <span>More</span></span>
                  </span>
                </a>
                <!-- View More (Button) Ends -->
                <!-- Image Info Starts -->
                <div class="image-info">
                  <!-- Project Name Starts -->
                  <span class="project-name">{{ item.title }}</span>
                  <!-- Project Name Ends -->
                  <!-- Project Tags Starts -->
                  <span class="project-tags">
                    <!-- Tag Icon Starts -->
                    <span class="tag-icon">
                      <i class="fas fa-tags"></i>
                    </span>
                    <!-- Tag Icon Ends -->
                    <!-- Tag Label Starts -->
                    <span class="tag-label">{{ item.category }}</span>
                    <!-- Tag Label Ends -->
                  </span>
                  <!-- Project Tags Ends -->
                </div>
                <!-- Image Info Ends -->
              </div>
              <!-- Overlay Ends -->
            </div>
            <!-- Single Item Ends -->
          </div>
        </div>
        <!-- Portfolio Item Ends -->
      </div>
    </div>
    <!-- Projects Ends -->

    <ng-template #modelContent let-modal>
      <!-- <div class="modal-header">
    <h4 class="modal-title">Modal title</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div> -->
      <div class="modal-body">
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
        <!-- Project Popup Starts -->
        <div id="restaurant-logo-collection" class="project-popup p-0">
          <!-- Project Picture On Popup Starts -->

          <img class="project-picture" *ngIf="currentProject.image !== null" src="{{ currentProject.image }}" alt="Data Landing Page" />
          <img
            class="project-picture"
            *ngIf="currentProject.image === null"
            src="assets/img/projects/restaurant-logo-collection.jpg"
            alt="Data Landing Page"
          />
          <!-- Project Picture On Popup Ends -->
          <!-- Project Name Starts -->
          <h5 class="project-name">{{ currentProject.title }}</h5>
          <!-- Project Name Ends -->
          <!-- Project Info Starts -->
          <div class="project-info">
            <!-- List Info Project Starts -->
            <ul class="list-info-project">
              <!-- Single List Starts -->
              <li>
                <span class="label">Client</span>
                <span class="separator">: </span>
                <span class="value">{{ currentProject.client }}</span>
              </li>
              <!-- Single List Ends -->
              <!-- Single List Starts -->
              <!-- <li>
            <span class="label">Date</span>
            <span class="separator">:</span>
            <span class="value">{{ currentProject.date }}</span>
          </li> -->
              <!-- Single List Ends -->
              <!-- Single List Starts -->
              <li>
                <span class="label">Categories</span>
                <span class="separator">: </span>
                <span class="value">{{ currentProject.category }}</span>
              </li>
              <!-- Single List Ends -->
            </ul>
            <!-- List Info Project Ends -->
            <!-- Project Description Starts -->
            <div class="project-description">
              <!-- Single Paragraph Starts -->
              <p>{{ currentProject.description }}</p>
              <!-- Single Paragraph Ends -->
            </div>
            <!-- Project Description Ends -->
          </div>
          <!-- Project Info Ends -->
          <!-- Project source Button Starts -->
          <a class="project-source" href="{{ currentProject.link }}" target="_blank" *ngIf="currentProject.link !== null">
            <span class="front">
              <i class="fas fa-long-arrow-alt-right"></i>
              <span class="value">Visit <span>Project</span></span>
            </span>
            <span class="back">
              <i class="fas fa-long-arrow-alt-right"></i>
              <span class="value">Visit <span>Project</span></span>
            </span>
          </a>
          <!-- Project Source Button Ends -->
        </div>
        <!-- Project Popup Ends -->
      </div>
    </ng-template>
  `,
  styles: [],
  standalone: true,
  imports: [NgClass, NgFor, NgIf, AsyncPipe]
})
export class ProjectsComponent implements OnInit {
  modalService = inject(NgbModal);
  registerService = inject(AppService);

  projectsData$: Observable<Project[]> = this.registerService.getProjects('');

  currentTab: string;
  currentProject: Project = {
    id: 0,
    image: '',
    title: '',
    category: '',
    client: '',
    date: null,
    description: '',
    link: null
  };

  ngOnInit(): void {
    this.currentTab = 'All';
  }

  openProjectDetails(modelContent: any, projectData: Project): void {
    this.currentProject = projectData;

    this.modalService.open(modelContent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdropClass: 'dark-backdrop'
    });
  }

  getProjects(category = ''): void {
    if (category) {
      this.currentTab = category;
      this.projectsData$ = this.registerService.getProjects(category);
    } else {
      this.currentTab = 'All';
      this.projectsData$ = this.registerService.getProjects('');
    }
  }
}
