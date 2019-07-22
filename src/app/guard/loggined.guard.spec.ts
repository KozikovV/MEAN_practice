import { TestBed, async, inject } from '@angular/core/testing';

import { LogginedGuard } from './loggined.guard';

describe('LogginedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogginedGuard]
    });
  });

  it('should ...', inject([LogginedGuard], (guard: LogginedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
