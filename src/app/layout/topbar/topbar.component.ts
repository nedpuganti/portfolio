import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

interface RouteMeta {
  eyebrow: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  private readonly defaultRouteMeta: RouteMeta = {
    eyebrow: 'Agentic Portfolio',
    title: 'Conversational workspace',
    description: 'Ask about projects, platform work, skills, and the product systems behind them.'
  };

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly routeMeta = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.resolveRouteMeta()),
      startWith(this.defaultRouteMeta)
    ),
    {
      initialValue: this.defaultRouteMeta
    }
  );

  private resolveRouteMeta(): RouteMeta {
    const rootSnapshot = this.router.routerState?.snapshot?.root;

    if (!rootSnapshot) {
      return this.defaultRouteMeta;
    }

    let routeSnapshot = rootSnapshot;

    while (routeSnapshot?.firstChild) {
      routeSnapshot = routeSnapshot.firstChild;
    }

    const data = routeSnapshot?.data ?? this.activatedRoute.snapshot?.data ?? {};

    return {
      eyebrow: typeof data['eyebrow'] === 'string' ? data['eyebrow'] : this.defaultRouteMeta.eyebrow,
      title: typeof data['pageTitle'] === 'string' ? data['pageTitle'] : this.defaultRouteMeta.title,
      description: typeof data['pageDescription'] === 'string' ? data['pageDescription'] : this.defaultRouteMeta.description
    };
  }
}
