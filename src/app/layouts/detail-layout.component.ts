import { NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap, startWith, take } from 'rxjs';

@Component({
  selector: 'pfo-detail-layout',
  template: `
    @if (pageId) {

    <!-- Main Content (pageId) Starts -->
    <div [id]="pageId" class="main-content active">
      <!-- Close Button Starts -->
      <a [routerLink]="['/home']" class="close-menu-link">
        <i class="close-button fas fa-times-circle fa-2x"></i>
      </a>
      <!-- Close Button Ends -->
      <!-- Content Hanging On pageId Section Starts -->
      <div class="hanging">
        <div class="logo-hanging">
          <i class="fas fa-id-card"></i>
        </div>
        <div class="text-hanging">
          <div class="word">
            <h6>
              {{ title1() | uppercase }} <span>{{ title2() | uppercase }}</span>
            </h6>
          </div>
        </div>
      </div>
      <!-- Content Hanging On pageId Section Ends -->
      <!-- Inner Content Starts -->
      <div class="inner-content">
        <!-- Head Content Starts -->
        <div class="head-content">
          <h3>
            {{ title1() | titlecase }} <span>{{ title2() | titlecase }}</span>
          </h3>
        </div>
        <!-- Head Content Ends -->
        <!-- Content Starts -->
        <div class="content">
          <router-outlet></router-outlet>
        </div>
        <!-- Content Ends -->
      </div>
      <!-- Inner Content Ends -->
    </div>
    <!-- Main Content (pageId) Ends -->

    }
  `,
  styles: [],
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, TitleCasePipe, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailLayoutComponent {
  title1 = signal<string>('');
  title2 = signal<string>('');
  pageId = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        startWith(this.router),
        map(() => this.activatedRoute),
        map((route: ActivatedRoute) => route.firstChild),
        mergeMap((route: ActivatedRoute) => route.data),
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data: Record<string, string>) => {
        if (data) {
          this.pageId = data.pageId;

          const title = data?.title?.split(' ');

          this.title1.set(title?.[0]);
          this.title2.set(title?.[1]);
        }
      });
  }
}
