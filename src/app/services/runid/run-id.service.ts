import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunIdService {

  private _runId: string;
  private _possibleStudies = [0, 1, 2];
  private _maxStudies = 3;
  private _studyOrder: number[];

  private _iniStudiesSuccess = false;

  constructor() {
    this._runId = this.generateRunId();
    this._studyOrder = [];
  }



  private generateRunId(): string {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timeStamp = date + '_' + time;
    const randomNumber = Math.floor(Math.random() * 10000);
    return timeStamp + '_' + randomNumber;
  }

  private async generateStudyOrder() {
    const totalStudies = this._possibleStudies.length;
    console.log(`Possible Studies: ${this._possibleStudies}`);
    for (let i = 0; i < totalStudies; i++) {
      const nextStudy = Math.floor(Math.random() * this._possibleStudies.length);
      console.log(`Next Study: ${nextStudy}`)
      this._studyOrder.push(this._possibleStudies[nextStudy]);
      this._possibleStudies.splice(nextStudy, 1);
      console.log(`Possible Studies: ${JSON.stringify(this._possibleStudies)}`);
    }
    console.log(`Generated Study Order: ${JSON.stringify(this._studyOrder)}`);
  }

  public async getNextStudyIdx(): Promise<number | undefined> {
    if (!this._iniStudiesSuccess) {
      console.log('Init Study Order');
      await this.generateStudyOrder();
      this._iniStudiesSuccess = true;
    }
    console.log(`Return Study Order ${JSON.stringify(this._studyOrder.length)}`);
    return this._studyOrder.pop();
  }

  public getCurrentStudyProgress():number{
    return this._maxStudies - this._studyOrder.length;
  }

  public getMaxStudies(): number{
    return this._maxStudies;
  }

  get runId(): string {
    return this._runId;
  }
}
