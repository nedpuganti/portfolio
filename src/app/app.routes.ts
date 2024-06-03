import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/app-layout.component').then((m) => m.AppLayoutComponent),
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
        title: 'Home Page'
      },
      {
        path: '',
        loadComponent: () => import('./layouts/detail-layout.component').then((m) => m.DetailLayoutComponent),
        children: [
          {
            path: 'about',
            loadComponent: () => import('./pages/about.component').then((m) => m.AboutComponent),
            title: 'About Me',
            data: {
              title: 'About Me',
              pageId: 'about'
            }
          },
          {
            path: 'resume',
            loadComponent: () => import('./pages/resume.component').then((m) => m.ResumeComponent),
            title: 'My Resume',
            data: {
              title: 'My Resume',
              pageId: 'resume'
            }
          },
          {
            path: 'portfolio',
            loadComponent: () => import('./pages/portfolio.component').then((m) => m.PortfolioComponent),
            title: 'My Portfolio',
            data: {
              title: 'My Portfolio',
              pageId: 'portfolio'
            }
          },
          {
            path: 'contact',
            loadComponent: () => import('./pages/contact.component').then((m) => m.ContactComponent),
            title: 'Contact Me',
            data: {
              title: 'Contact Me',
              pageId: 'contact'
            }
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
