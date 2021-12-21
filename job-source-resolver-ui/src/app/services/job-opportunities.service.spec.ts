import { TestBed } from '@angular/core/testing';

import { JobOpportunitiesService } from './job-opportunities.service';

describe('JobOpportunitiesService', () => {
  let service: JobOpportunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOpportunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
