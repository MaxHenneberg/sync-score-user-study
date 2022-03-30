import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserData} from "./entity/UserData";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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
  country_list = [
    "Germany",
    "United States of America",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
  ];


  countryLivingList: string[];
  countryGrownUpList: string[];


  model = new UserData(0, '', '', '');

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService, private databaseService: DatabaseService, private runIdService: RunIdService) {

    this.form = this.fb.group({
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: [null, Validators.required],
      countryLiving: [null, [Validators.required, this.countryValidator()]],
      countryGrownUp: [null, [Validators.required,this.countryValidator()]],
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

  /** A hero's name can't match the given regular expression */
  private countryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // console.log(this.form?.get('countryLiving')?.errors);
      // console.log(control.value);
      const included = this.country_list.includes(control.value);
      return included ? null : {notInCountryList: true};
    };
  }

}
