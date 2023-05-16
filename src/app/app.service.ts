import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  mockHardSkills,
  mockSoftSkills,
  mocksProjects,
  mockServices,
  mockEducation,
  mockExperience,
  mockFunFacts,
  mockContactInfo,
  mockPersonalInfo
} from './mocks';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  getExperienceYearsCount() {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  getHardSkills() {
    return of(mockHardSkills);
  }

  getSoftSkills() {
    return of(mockSoftSkills);
  }

  getServices() {
    return of(mockServices);
  }

  getFunFacts() {
    return of(mockFunFacts(this.getExperienceYearsCount()));
  }

  getContactInfo() {
    return of(mockContactInfo);
  }

  getPersonalInfo() {
    return of(mockPersonalInfo(this.getExperienceYearsCount()));
  }

  getExperiences() {
    return of(mockExperience);
  }

  getEducations() {
    return of(mockEducation);
  }

  getProjects(category: string): Observable<any[]> {
    if (category) {
      return of(mocksProjects.filter((el: any) => category === el.category));
    }

    return of(mocksProjects);
  }
}
