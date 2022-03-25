import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatabaseService} from "../database/database.service";
import {UserStudyTO} from "../database/entity/UserStudyTO";
import {RunIdService} from "../runid/run-id.service";

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private possibleStudies = ['study1', 'study2', 'study3', 'study4'];
  private framesPerStudy = [30475, 18450, 21275, 15625];
  private frameRate = 25;

  private currentStudyIdx = -1;
  private currentStudySyncScore: number[] = [];

  constructor(private snackBar: MatSnackBar, private databaseService: DatabaseService, private runIdService: RunIdService) {
    this.resetStudy();
  }

  getStudyVideo(): string {
    const study = this.possibleStudies[this.currentStudyIdx];
    return `https://nextcloud.in.tum.de/index.php/s/Rq728xWEtaGitSn/download?path=%2FstudyVideos%2F${study}&files=P1.mp4`;
  }

  startStudy(): number {
    this.currentStudyIdx = Math.floor(Math.random() * this.possibleStudies.length);
    for (let i = 0; i < this.getFramesForCurrentStudy(); i++) {
      this.currentStudySyncScore.push(0)
    }
    return this.currentStudyIdx;
  }

  registerSyncDuration(start: number, end: number) {
    const startFrame = this.toFrames(start);
    const endFrame = this.toFrames(end);
    if (startFrame >= 0 && endFrame < this.getFramesForCurrentStudy()) {
      for (let i = startFrame; i < endFrame; i++) {
        this.currentStudySyncScore[i] = 1;
      }
      this.showSnackBar(startFrame, endFrame);
      console.log(`Segment Registert [${startFrame}:${endFrame}]`)
    } else {
      console.error(`Invalid Segment received [${startFrame}:${endFrame}]`)
    }
  }

  showSnackBar(startFrame: number, endFrame: number) {
    const message = `Segment Registert [${startFrame}:${endFrame}]`;
    this.snackBar.open(message, '', {duration: 2000, horizontalPosition: 'right'});
  }

  toFrames(timeStamp: number) {
    return Math.floor(timeStamp * this.frameRate)
  }

  endStudy(): void {
    this.databaseService.storeStudy(new UserStudyTO(this.runIdService.runId, this.currentStudyIdx, this.currentStudySyncScore))
    this.resetStudy();
  }

  getFramesForCurrentStudy(): number {
    return this.framesPerStudy[this.currentStudyIdx];
  }

  resetStudy(): void {
    this.currentStudyIdx = -1;
    this.currentStudySyncScore = [];
  }
}
