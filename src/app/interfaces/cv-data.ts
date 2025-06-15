import { DEFAULT_PERSONAL_INFO, PersonalInfo } from './personal-info';

export interface CvData {
  personalInfo: PersonalInfo;
}

export const DEFAULT_CV_DATA: CvData = {
  personalInfo: DEFAULT_PERSONAL_INFO,
};
