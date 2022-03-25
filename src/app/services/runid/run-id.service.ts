import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunIdService {

  private _runId: string;

  constructor() {
    this._runId = this.generateRunId();
  }

  private generateRunId(): string {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timeStamp = date + '_' + time;
    const randomNumber = Math.floor(Math.random() * 10000);
    return timeStamp + '_' + randomNumber;
  }


  get runId(): string {
    return this._runId;
  }
}
