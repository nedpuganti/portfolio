import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  getExperienceYearsCount() {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }
}
