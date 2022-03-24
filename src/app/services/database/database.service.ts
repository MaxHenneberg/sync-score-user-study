import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";
import {UserStudy} from "./entity/UserStudy";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  backendUrl = 'https://user-study-backend-new.vercel.app'
  path = '/userstudy'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT'
    })
  };

  constructor(private http: HttpClient) {
  }

  storePath = '/store'

  storeStudy(userStudy: UserStudy) {
    console.log(`Sending Post: ${JSON.stringify(userStudy)}`)
    this.http.post('https://user-study-backend-new.vercel.app/userstudy/store', userStudy).subscribe(result => console.log(result));
  }
}
