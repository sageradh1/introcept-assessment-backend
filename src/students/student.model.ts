
export class Student {
    constructor(
      public id: number,
      public name: string,
      public gender: string,
      public phone: number,
      public email: string,
      public nationality: string,
      // public dob: Date,
      public dob: string,
      public educationbackground: string,
      public preferredmodeofcontact: string,
    ) {}
  }