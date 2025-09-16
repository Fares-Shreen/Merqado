import { TestBed } from '@angular/core/testing';

import { CategoriesPage } from './categories-page';

describe('CategoriesPage', () => {
  let service: CategoriesPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesPage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
