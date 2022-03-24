import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";
import {UserStudy} from "./entity/UserStudy";

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

  storeStudy(userStudy: UserStudy) {
    console.log(`Sending Post: ${JSON.stringify(userStudy)}`)
    this.http.post('https://user-study-backend-new-9r0z10p1s-maxhenneberg.vercel.app/userstudy/store', userStudy).subscribe(result => console.log(result));
  }
}
