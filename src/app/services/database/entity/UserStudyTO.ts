export class UserStudyTO {
  runId: string;
  study: number;
  syncScore: string;

  constructor(runId: string, study: number, syncScore: number[]) {
    this.runId = runId;
    this.study = study;
    this.syncScore = syncScore.join(' ');
  }
}
