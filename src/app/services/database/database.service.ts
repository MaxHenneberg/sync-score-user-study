import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // databaseUser: { username: string, password: string };

  constructor(private http: HttpClient) {
    console.log('TEST:')
    console.log(process.env.MY_TEST_VAR)
    // this.databaseUser = {username: '', password: ''};
    // this.http.get('/assets/database/database_user.json').subscribe(data => {
    //   console.log(data);
    //   // @ts-ignore
    //   this.databaseUser = data;
    //   console.log(this.databaseUser.username);
    // });
  }
}
