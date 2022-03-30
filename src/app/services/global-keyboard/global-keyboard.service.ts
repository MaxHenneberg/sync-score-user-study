import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalKeyboardService {

  private _keyBoardDownEvent = new EventEmitter<string>();
  private _keyBoardUpEvent = new EventEmitter<string>();

  constructor() {
  }

  registerKeyBoardDown(event: KeyboardEvent): void {
    this._keyBoardDownEvent.next(event.code);
  }

  registerKeyBoardUp(event: KeyboardEvent): void {
    this._keyBoardUpEvent.next(event.code);
  }


  get keyBoardDownObs(): Observable<string> {
    return this._keyBoardDownEvent.asObservable();
  }

  get keyBoardUpObs(): Observable<string> {
    return this._keyBoardUpEvent.asObservable();
  }
}
