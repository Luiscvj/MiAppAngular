import { TestBed } from '@angular/core/testing';

import { ApiAwpService } from './api-awp.service';

describe('ApiAwpService', () => {
  let service: ApiAwpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAwpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
