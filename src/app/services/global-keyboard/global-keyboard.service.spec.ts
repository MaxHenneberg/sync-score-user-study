import { TestBed } from '@angular/core/testing';

import { GlobalKeyboardService } from './global-keyboard.service';

describe('GlobalKeyboardService', () => {
  let service: GlobalKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
