import { TestBed } from '@angular/core/testing';

import { RunIdService } from './run-id.service';

describe('RunIdService', () => {
  let service: RunIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
