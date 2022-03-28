import {EventEmitter, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatabaseService} from "../database/database.service";
import {UserStudyTO} from "../database/entity/UserStudyTO";
import {RunIdService} from "../runid/run-id.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private possibleStudies = ['study1', 'study2', 'study3'];
  private framesPerStudy = [5400, 5400, 5400];
  private frameRate = 30;

  private currentStudyIdx = -1;
  private currentStudySyncScore: number[] = [];

  private _videoLinkEmitter = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar,
              private databaseService: DatabaseService,
              private runIdService: RunIdService,
              private router: Router) {
  }

  startStudy(): void {
    this.getNextStudyIdx().then(idx => {
      if (idx != undefined && idx >= 0) {
        this.currentStudyIdx = idx;
        console.log(`Current Study Idx: ${this.currentStudyIdx}`);
        for (let i = 0; i < this.getFramesForCurrentStudy(); i++) {
          this.currentStudySyncScore.push(0)
        }
        this._videoLinkEmitter.next(`https://nextcloud.in.tum.de/index.php/s/Rq728xWEtaGitSn/download?path=%2FstudyVideos%2F${this.possibleStudies[this.currentStudyIdx]}&files=MERGED.mp4`);
      } else {
        this.router.navigateByUrl('/end');
      }
    });
  }

  registerSyncDuration(start: number, end: number) {
    const startFrame = Math.max(0, this.toFrames(start));
    const endFrame = Math.min(this.getFramesForCurrentStudy(), this.toFrames(end));
    if (startFrame >= 0 && endFrame <= this.getFramesForCurrentStudy()) {
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

  endStudy(abort: boolean): void {
    console.log('End Study');
    if (!abort) {
      this.databaseService.storeStudy(new UserStudyTO(this.runIdService.runId, this.currentStudyIdx, this.currentStudySyncScore))
      this.resetStudy();
      this.startStudy();
    }

  }

  getFramesForCurrentStudy(): number {
    return this.framesPerStudy[this.currentStudyIdx];
  }

  resetStudy(): void {
    this.currentStudyIdx = -1;
    this.currentStudySyncScore = [];
  }

  private async getNextStudyIdx(): Promise<number | undefined> {
    return await this.runIdService.getNextStudyIdx();
  }

  public getVideoLinkObs(): Observable<string> {
    return this._videoLinkEmitter.asObservable();
  }

  public getStudyProgressText(): string {
    return `(${this.runIdService.getCurrentStudyProgress()}/${this.runIdService.getMaxStudies()})`;
  }
}
