import { TestBed } from '@angular/core/testing';

import { NasaApiService } from './service.service';

describe('ServiceService', () => {
  let service: NasaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
