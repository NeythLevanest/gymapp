import { TestBed } from '@angular/core/testing';

import { SignupModalserviceService } from './signup-modalservice.service';

describe('SignupModalserviceService', () => {
  let service: SignupModalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupModalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
