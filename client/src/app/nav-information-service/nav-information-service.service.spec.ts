import { TestBed, inject } from '@angular/core/testing';

import { NavInformationServiceService } from './nav-information-service.service';

describe('NavInformationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavInformationServiceService]
    });
  });

  it('should be created', inject([NavInformationServiceService], (service: NavInformationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
