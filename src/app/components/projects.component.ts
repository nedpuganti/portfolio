import { NgClass } from '@angular/common';
import { Component, computed, inject, Injector, Signal, signal, TemplateRef, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppService } from '../app.service';
import { Project } from '../interfaces/project.interface';

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
              <a [ngClass]="currentTab() === 'All' ? 'current' : ''" (click)="getProjects()" href="javascript:void(0);">All Projects</a>
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a [ngClass]="currentTab() === 'Mobile' ? 'current' : ''" (click)="getProjects('Mobile')" href="javascript:void(0);"
                >Mobile Apps</a
              >
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a [ngClass]="currentTab() === 'Website' ? 'current' : ''" (click)="getProjects('Website')" href="javascript:void(0);"
                >Websites</a
              >
            </li>
            <!-- Single Filter Ends -->
            <!-- Single Filter Starts -->
            <li>
              <a [ngClass]="currentTab() === 'Portal' ? 'current' : ''" (click)="getProjects('Portal')" href="javascript:void(0);"
                >Portals</a
              >
            </li>
            <!-- Single Filter Ends -->
          </ul>
        </div>
        <!-- Portfolio Filter Ends -->
        <!-- Portfolio Item Starts -->
        <div class="portfolio-item col-12">
          <div class="item-wrapper row">
            <!-- Single Item Starts -->
            @for (item of displayProjects(); track $index) {
              <div class="item web-templates col-md-4 col-sm-6 col-12">
                <!-- Image Starts -->
                <div class="image">
                  @if (item.image) {
                    <img [src]="item.image" alt="Data Landing Page" height="226" />
                  }
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
            }
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
        <button class="close" (click)="modal.dismiss('Cross click')" type="button" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <!-- Project Popup Starts -->
        <div class="project-popup p-0" id="restaurant-logo-collection">
          <!-- Project Picture On Popup Starts -->

          @if (currentProject.image) {
            <img class="project-picture" src="{{ currentProject.image }}" alt="Data Landing Page" />
          } @else {
            <img class="project-picture" src="assets/img/projects/restaurant-logo-collection.jpg" alt="Data Landing Page" />
          }
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
          @if (currentProject.link) {
            <a class="project-source" href="{{ currentProject.link }}" target="_blank">
              <span class="front">
                <i class="fas fa-long-arrow-alt-right"></i>
                <span class="value">Visit <span>Project</span></span>
              </span>
              <span class="back">
                <i class="fas fa-long-arrow-alt-right"></i>
                <span class="value">Visit <span>Project</span></span>
              </span>
            </a>
          }
          <!-- Project Source Button Ends -->
        </div>
        <!-- Project Popup Ends -->
      </div>
    </ng-template>
  `,
  styles: [],
  standalone: true,
  imports: [NgClass]
})
export class ProjectsComponent {
  readonly registerService = inject(AppService);
  readonly injector = inject(Injector);

  projectsData$: Signal<Project[]> = toSignal(this.registerService.getProjects(''), { initialValue: [] });
  projectsData: Signal<WritableSignal<Project[]>> = computed(() => signal(this.projectsData$()));
  displayProjects: Signal<Project[]> = this.projectsData();

  currentTab = signal('All');
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

  openProjectDetails(modelContent: TemplateRef<unknown>, projectData: Project): void {
    this.currentProject = projectData;

    // this.modalService.open(modelContent, {
    //   size: 'lg',
    //   scrollable: true,
    //   centered: true,
    //   backdropClass: 'dark-backdrop'
    // });
  }

  getProjects(category = ''): void {
    this.currentTab.update(() => category || 'All');
    this.projectsData$ = toSignal(this.registerService.getProjects(category), {
      initialValue: [],
      injector: this.injector
    });
    this.projectsData().set(this.projectsData$());
  }
}
