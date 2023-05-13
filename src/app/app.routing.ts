import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About Me'
      },
      {
        path: 'resume',
        component: ResumeComponent,
        title: 'My Resume'
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
        title: 'My Portfolio'
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Me'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
