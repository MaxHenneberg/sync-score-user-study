import {Component, HostListener} from '@angular/core';
import {GlobalKeyboardService} from "./services/global-keyboard/global-keyboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-study-page';

  constructor(private globalKeyboardService: GlobalKeyboardService) {
  }

  @HostListener('document:keypress', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!event.repeat) {
      this.globalKeyboardService.registerKeyBoardDown(event);
    }

  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (!event.repeat) {
      this.globalKeyboardService.registerKeyBoardUp(event);
    }
  }
}
