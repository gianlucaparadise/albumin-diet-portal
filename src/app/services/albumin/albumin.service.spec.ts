import { TestBed } from '@angular/core/testing';

import { AlbuminService } from './albumin.service';

describe('AlbuminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbuminService = TestBed.get(AlbuminService);
    expect(service).toBeTruthy();
  });
});
