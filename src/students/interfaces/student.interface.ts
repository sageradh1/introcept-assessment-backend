// For interaction between csv file and services
export interface StudentInterface {
  id?: number;
  name: string;
  gender: string;
  phone: number;
  email: string;
  nationality: string;
  // dob: Date,
  dob: string;
  educationbackground: string;
  preferredmodeofcontact: string;
  password?: string;
}
