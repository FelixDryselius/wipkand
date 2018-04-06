import { TestBed, inject } from '@angular/core/testing';

import { CommentServiceService } from './comment-service.service';

describe('CommentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentServiceService]
    });
  });

  it('should be created', inject([CommentServiceService], (service: CommentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
