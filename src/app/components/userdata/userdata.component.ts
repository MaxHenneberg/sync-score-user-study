import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserData} from "./entity/UserData";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of, startWith} from "rxjs";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../services/auth/auth-service.service";
import {DatabaseService} from "../../services/database/database.service";
import {UserDataTO} from "../../services/database/entity/UserDataTO";
import {RunIdService} from "../../services/runid/run-id.service";

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  @ViewChild('countryLiving')
    // @ts-ignore
  countryLiving: Input;

  form: FormGroup;

  gender = [
    'male',
    'female',
    'divers',
    'not listed',
    'dont want to answer']
  education = [
    'Still in school',
    'Finished school with no qualification',
    'Junior High / Middle School Diploma',
    'Vocational / Technical School Diploma',
    'A-levels/International Baccalaureate, subject-related higher education entrance qualification',
    'University or college degree: Bachelor’s / Master’s / Professional degrees (MD, JD, etc.)',
    'Doctorate / Postdoctoral lecture qualification']
  country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  countryLivingList: string[];
  countryGrownUpList: string[];


  model = new UserData(0, '', '', '');

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService, private databaseService: DatabaseService, private runIdService: RunIdService) {

    this.form = this.fb.group({
      age: [null, [Validators.required]],
      gender: [null, Validators.required],
      countryLiving: [null, Validators.required],
      countryGrownUp: [null, Validators.required],
      education: [null, Validators.required]
    });
    this.countryLivingList = this.country_list;
    this.countryGrownUpList = this.country_list;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const userData = this.createUserDataTO();
      this.authService.setUserDataCheck();
      this.databaseService.storeUserData(userData)
      this.router.navigate(['/explanation']);
    }
  }

  private createUserDataTO(): UserDataTO {
    return new UserDataTO(
      this.runIdService.runId,
      this.form.get('age')?.value,
      this.form.get('gender')?.value,
      this.form.get('countryLiving')?.value,
      this.form.get('countryGrownUp')?.value,
      this.form.get('education')?.value)
  }

  public onCountryLivingChange(e: any): void {
    const filterVal = this.form.controls['countryLiving'].value;
    this.countryLivingList = (this.country_list.filter(c => c.startsWith(filterVal)))
  }

  public onCountryGrownUpChange(e: any): void {
    const filterVal = this.form.controls['countryGrownUp'].value;
    this.countryGrownUpList = (this.country_list.filter(c => c.startsWith(filterVal)))
  }

}
