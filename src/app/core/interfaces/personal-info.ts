export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;

  socialLinks: {
    title: string;
    link: string;
  }[];

  idNumber: string;
  birthDate: string;
  nationality: string;
  drivingLicense: string;
}

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
  socialLinks: [
    {
      title: 'LinkedIn Profile',
      link: '',
    },
    {
      title: 'GitHub Profile',
      link: '',
    },
  ],
  idNumber: '',
  birthDate: '',
  nationality: '',
  drivingLicense: '',
};
