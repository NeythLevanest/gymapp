import { TestBed } from '@angular/core/testing';

import { StepreserveService } from './stepreserve.service';

describe('StepreserveService', () => {
  let service: StepreserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepreserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
