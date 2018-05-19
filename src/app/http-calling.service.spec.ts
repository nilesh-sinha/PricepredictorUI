import { TestBed, inject } from '@angular/core/testing';

import { HttpCallingService } from './http-calling.service';

describe('HttpCallingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCallingService]
    });
  });

  it('should be created', inject([HttpCallingService], (service: HttpCallingService) => {
    expect(service).toBeTruthy();
  }));
});
