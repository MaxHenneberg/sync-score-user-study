import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudyService} from "../../services/study/study.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../services/auth/auth-service.service";
import {GlobalKeyboardService} from "../../services/global-keyboard/global-keyboard.service";

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  @ViewChild('videoPlayer')
    // @ts-ignore
  videoPlayer: ElementRef;
  private videoPlaying = false;
  private _keyDownBlocked = false;

  videoLink = '';

  private startTimeStamp = -1;
  private endTimeStamp = -1;
  private _videoLoaded = false;

  constructor(private studyService: StudyService,
              private authService: AuthServiceService,
              private globalKeyBoardService: GlobalKeyboardService) {
    this.studyService.getVideoLinkObs().subscribe(link => {
      console.log(`Got Link: ${JSON.stringify(link)}`);
      this.videoLink = link;
      this.videoPlayer.nativeElement.load();
    });

    this.globalKeyBoardService.keyBoardDownObs.subscribe(key => {
      this.onKeyDown(key);
    });
    this.globalKeyBoardService.keyBoardUpObs.subscribe(key => {
      this.onKeyUp(key);
    });
  }

  onKeyDown(key: string): void {
    if (key == 'Space' && !this._keyDownBlocked) {
      this._keyDownBlocked = true;
      console.log('Down');
      this.onSegmentStart();
    }
  }

  onKeyUp(key: string): void {
    if (key == 'Space') {
      this.onSegmentEnd();
      console.log('Up');
      this._keyDownBlocked = false;
    }
  }

  ngOnInit(): void {
    this.studyService.startStudy();
  }

  onSyncButtonPress(): void {
    this.onSegmentStart();
  }

  onSegmentStart(): void {
    if (!this.isVideoPlaying()) {
      this.startVideo();
    } else {
      const timeStamp = this.videoPlayer.nativeElement.currentTime;
      this.registerSegmentStart(timeStamp);
    }
  }

  onSyncButtonRelease(): void {
    this.onSegmentEnd();
  }

  onSegmentEnd(): void {
    if (this.isVideoPlaying()) {
      const timeStamp = this.videoPlayer.nativeElement.currentTime;
      this.registerSegmentEnd(timeStamp)
    }
  }

  registerSegmentStart(startFrame: number) {
    if (this.endTimeStamp == -1) {
      this.startTimeStamp = startFrame;
    } else {
      console.error("Invalid Segment Start");
      this.resetSegment();
    }
  }

  registerSegmentEnd(endFrame: number) {
    if (this.startTimeStamp >= 0) {
      this.endTimeStamp = endFrame;
      this.studyService.registerSyncDuration(this.startTimeStamp, this.endTimeStamp);
      this.resetSegment();
    } else {
      console.error("Invalid Segment End")
      this.resetSegment();
    }
  }

  resetSegment(): void {
    this.startTimeStamp = -1;
    this.endTimeStamp = -1;
  }

  onVideoEnded(): void {
    this.onSegmentEnd();
    this.authService.setStudyCheck();
    this.videoPlaying = false;
    this._videoLoaded = false;
    this.studyService.endStudy(false);
  }

  startVideo(): void {
    this.videoPlaying = true;
    this.videoPlayer.nativeElement.play();
  }

  isVideoPlaying(): boolean {
    return this.videoPlaying;
  }

  getButtonText(): string {
    if (!this.isVideoPlaying()) {
      return "Start";
    } else {
      if(this.keyDownBlocked){
        return "Registering Segment";
      }else{
        return "In Sync";
      }
    }
  }

  onDataLoaded(): void {
    this._videoLoaded = true;
  }


  get videoLoaded(): boolean {
    return this._videoLoaded;
  }

  getVideoProgress(): string {
    if (this.videoPlaying) {
      const currentFrame = this.studyService.toFrames(this.videoPlayer.nativeElement.currentTime);
      const framesForStudy = this.studyService.getFramesForCurrentStudy();
      if (currentFrame > 0) {
        const progress = Math.floor(100 * (this.studyService.toFrames(this.videoPlayer.nativeElement.currentTime) / this.studyService.getFramesForCurrentStudy()));
        return `Video Progress: ${progress} %`;
      }
    }
    return 'Video Progress: 0 %';
  }

  getHeadLineText(): string {
    return `Study Progress ${this.studyService.getStudyProgressText()}`;
  }


  get keyDownBlocked(): boolean {
    return this._keyDownBlocked;
  }
}
