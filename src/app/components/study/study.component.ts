import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudyService} from "../../services/study/study.service";
import {Router} from "@angular/router";

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

  videoLink: string;


  private startTimeStamp = -1;
  private endTimeStamp = -1;

  constructor(private studyService: StudyService, private router: Router) {
    this.studyService.startStudy();
    this.videoLink = this.studyService.getStudyVideo();
  }

  ngOnInit(): void {
  }

  onSyncButtonPress(): void {
    if (!this.isVideoPlaying()) {
      this.startVideo();
    } else {
      const timeStamp = this.videoPlayer.nativeElement.currentTime;
      this.registerSegmentStart(timeStamp);
    }
  }

  onSyncButtonRelease(): void {
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
    this.studyService.endStudy();
    this.router.navigate(['/end'])
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
      return "In Sync";
    }
  }

}
