import { Injectable, signal } from '@angular/core';
import { CvData, DEFAULT_CV_DATA } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  data = signal<CvData>(DEFAULT_CV_DATA);
}
