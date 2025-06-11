import { Injectable, signal } from '@angular/core';
import { DEFAULT_PERSONAL_INFO, PersonalInfo } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  personalInfo = signal<PersonalInfo>(DEFAULT_PERSONAL_INFO);
}
