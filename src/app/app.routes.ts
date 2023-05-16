import { Routes } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { HomeComponent } from './pages/home.component';
import { PortfolioComponent } from './pages/portfolio.component';
import { ResumeComponent } from './pages/resume.component';
import { DetailLayoutComponent } from './layouts/detail-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page'
      },
      {
        path: '',
        component: DetailLayoutComponent,
        children: [
          {
            path: 'about',
            component: AboutComponent,
            title: 'About Me',
            data: {
              title: 'About Me',
              pageId: 'about'
            }
          },
          {
            path: 'resume',
            component: ResumeComponent,
            title: 'My Resume',
            data: {
              title: 'My Resume',
              pageId: 'resume'
            }
          },
          {
            path: 'portfolio',
            component: PortfolioComponent,
            title: 'My Portfolio',
            data: {
              title: 'My Portfolio',
              pageId: 'portfolio'
            }
          },
          {
            path: 'contact',
            component: ContactComponent,
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
