import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserStudyTO} from "./entity/UserStudyTO";
import {UserDataTO} from "./entity/UserDataTO";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  storeStudy(userStudy: UserStudyTO) {
    console.log(`Sending UserStudy: ${JSON.stringify(userStudy)}`)
    this.http.post('http://user-study-backend.us-east-1.elasticbeanstalk.com/userstudy/store', userStudy).subscribe(result => console.log(result));
  }

  storeUserData(userData: UserDataTO) {
    console.log(`Sending UserData: ${JSON.stringify(userData)}`)
    this.http.post('http://user-study-backend.us-east-1.elasticbeanstalk.com/userdata/store', userData).subscribe(result => console.log(result));
  }
}
