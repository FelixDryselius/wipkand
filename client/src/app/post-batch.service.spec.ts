import { TestBed, inject } from '@angular/core/testing';

import { PostBatchService } from './post-batch.service';

describe('PostBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostBatchService]
    });
  });

  it('should be created', inject([PostBatchService], (service: PostBatchService) => {
    expect(service).toBeTruthy();
  }));
});
