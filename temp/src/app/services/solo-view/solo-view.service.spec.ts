import { TestBed } from '@angular/core/testing';

import { SoloViewService } from './solo-view.service';

describe('SoloViewService', () => {
  let service: SoloViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoloViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
