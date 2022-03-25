export class UserDataTO {
  runId: string;
  age: number;
  gender: string;
  countryLiving: string;
  countryGrownUp: string;
  education: string;


  constructor(runId: string, age: number, gender: string, livingCountry: string, countryGrownUp: string, education: string) {
    this.runId = runId;
    this.age = age;
    this.gender = gender;
    this.countryLiving = livingCountry;
    this.countryGrownUp = countryGrownUp;
    this.education = education;
  }
}
