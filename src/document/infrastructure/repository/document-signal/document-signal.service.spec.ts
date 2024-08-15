import { TestBed } from '@angular/core/testing';

import { DocumentSignalService } from './document-signal.service';

describe('DocumentSignalService', () => {
  let service: DocumentSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
