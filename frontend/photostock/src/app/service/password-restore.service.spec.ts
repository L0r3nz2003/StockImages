import { TestBed } from '@angular/core/testing';

import { PasswordRestoreService } from './password-restore.service';

describe('PasswordRestoreService', () => {
  let service: PasswordRestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
