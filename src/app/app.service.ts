import { Injectable } from '@angular/core';
import { ContactInfo, FunFacts, PersonalInfo } from '@app/interfaces/personal.interface';
import { Observable, of } from 'rxjs';
import { Education } from './interfaces/education.interface';
import { Experience } from './interfaces/experience.interface';
import { Project } from './interfaces/project.interface';
import { Service } from './interfaces/service.interface';
import { Skill } from './interfaces/skill.interface';
import {
  mockContactInfo,
  mockEducation,
  mockExperience,
  mockFunFacts,
  mockHardSkills,
  mockPersonalInfo,
  mockServices,
  mockSoftSkills,
  mocksProjects
} from './mocks';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  getExperienceYearsCount(): number {
    const startYear = 2014;
    const currentYear: number = new Date().getFullYear();
    return currentYear - startYear;
  }

  getHardSkills(): Observable<Skill[]> {
    return of(mockHardSkills);
  }

  getSoftSkills(): Observable<Skill[]> {
    return of(mockSoftSkills);
  }

  getServices(): Observable<Service[]> {
    return of(mockServices);
  }

  getFunFacts(): Observable<FunFacts[]> {
    return of(mockFunFacts(this.getExperienceYearsCount()));
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(mockContactInfo);
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of(mockPersonalInfo(this.getExperienceYearsCount()));
  }

  getExperiences(): Observable<Experience[]> {
    return of(mockExperience);
  }

  getEducations(): Observable<Education[]> {
    return of(mockEducation);
  }

  getProjects(category: string): Observable<Project[]> {
    if (category) {
      return of(mocksProjects.filter((project: Project) => category === project.category));
    }

    return of(mocksProjects);
  }
}
