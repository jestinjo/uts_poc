import { TestBed } from '@angular/core/testing';

import { ClrGraphService } from './clr-graph.service';

describe('ClrGraphService', () => {
  let service: ClrGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClrGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
