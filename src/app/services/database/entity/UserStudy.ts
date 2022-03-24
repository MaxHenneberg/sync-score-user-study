export class UserStudy {
  study: number;
  syncScore: string;

  constructor(study: number, syncScore: number[]) {
    this.study = study;
    this.syncScore = syncScore.join(',');
  }
}
