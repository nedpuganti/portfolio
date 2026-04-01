import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'unavailable',
    loadComponent: () =>
      import('./features/unavailable/api-unavailable-page.component').then((m) => m.ApiUnavailablePageComponent),
    title: 'Portfolio Unavailable | Naren Edpuganti'
  },
  {
    path: '',
    loadComponent: () => import('./layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home-page.component').then((m) => m.HomePageComponent),
        title: 'Naren Edpuganti | Agentic Portfolio',
        data: {
          eyebrow: 'Agentic Portfolio',
          pageTitle: 'Conversational workspace',
          pageDescription: 'Explore projects, platform engineering work, skills, and background through a guided AI-style portfolio.'
        }
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about-page.component').then((m) => m.AboutPageComponent),
        title: 'About | Naren Edpuganti',
        data: {
          eyebrow: 'About Naren',
          pageTitle: 'Profile and operating style',
          pageDescription: 'A concise view of background, strengths, and the kinds of product work Naren gravitates toward.'
        }
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects-page.component').then((m) => m.ProjectsPageComponent),
        title: 'Projects | Naren Edpuganti',
        data: {
          eyebrow: 'Project Atlas',
          pageTitle: 'Selected product work',
          pageDescription: 'Browse featured launches and grouped case studies across dashboards, portals, mobile apps, and websites.'
        }
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/experience/experience-page.component').then((m) => m.ExperiencePageComponent),
        title: 'Experience | Naren Edpuganti',
        data: {
          eyebrow: 'Experience Lens',
          pageTitle: 'Platform and product delivery',
          pageDescription: 'See the timeline behind the Angular, mobile, dashboard, and platform-aware work represented in the portfolio.'
        }
      },
      {
        path: 'skills',
        loadComponent: () => import('./features/skills/skills-page.component').then((m) => m.SkillsPageComponent),
        title: 'Skills | Naren Edpuganti',
        data: {
          eyebrow: 'Stack Map',
          pageTitle: 'Technology and delivery strengths',
          pageDescription: 'Grouped hard and soft skills with the service lanes they support most naturally.'
        }
      },
      {
        path: 'education',
        loadComponent: () => import('./features/education/education-page.component').then((m) => m.EducationPageComponent),
        title: 'Education | Naren Edpuganti',
        data: {
          eyebrow: 'Academic Background',
          pageTitle: 'Education and foundation',
          pageDescription: 'Formal study that complements years of production-facing engineering and product delivery.'
        }
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact-page.component').then((m) => m.ContactPageComponent),
        title: 'Contact | Naren Edpuganti',
        data: {
          eyebrow: 'Contact Route',
          pageTitle: 'Reach out or continue exploring',
          pageDescription: 'The fastest contact path plus a couple of useful follow-up actions if you want more context first.'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
