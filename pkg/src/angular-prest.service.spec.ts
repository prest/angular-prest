import { TestBed, inject } from '@angular/core/testing';

import { AngularPrestService } from './angular-prest.service';

describe('AngularPrestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularPrestService]
    });
  });

  it('should be created', inject([AngularPrestService], (service: AngularPrestService) => {
    expect(service).toBeTruthy();
  }));
});
