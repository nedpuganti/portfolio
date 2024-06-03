import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap, startWith, take, tap } from 'rxjs';

@Component({
  selector: 'pfo-detail-layout',
  template: `
    @if (pageId()) {
      @let titleOne = title1();
      @let titleTwo = title2();
      <!-- Main Content (pageId) Starts -->
      <div class="main-content active" [id]="pageId()">
        <!-- Close Button Starts -->
        <a class="close-menu-link" [routerLink]="['/home']">
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
                {{ titleOne | uppercase }} <span>{{ titleTwo | uppercase }}</span>
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
              {{ titleOne | titlecase }} <span>{{ titleTwo | titlecase }}</span>
            </h3>
          </div>
          <!-- Head Content Ends -->
          <!-- Content Starts -->
          <div class="content">
            <router-outlet />
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
  imports: [RouterOutlet, RouterLink, TitleCasePipe, UpperCasePipe]
})
export class DetailLayoutComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  title1 = signal<string>('');
  title2 = signal<string>('');
  pageId = signal('');

  readRouteData = toSignal(
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      startWith(this.router),
      map(() => this.activatedRoute),
      map((route: ActivatedRoute) => route.firstChild as ActivatedRoute),
      mergeMap((route: ActivatedRoute) => route.data),
      take(1),
      tap((data: Record<string, string>) => {
        if (data) {
          this.pageId.update(() => data['pageId']);

          const title = data['title'].split(' ');

          this.title1.set(title?.[0]);
          this.title2.set(title?.[1]);
        }
      })
    )
  );
}
