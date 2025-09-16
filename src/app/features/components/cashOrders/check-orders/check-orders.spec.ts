import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOrders } from './check-orders';

describe('CheckOrders', () => {
  let component: CheckOrders;
  let fixture: ComponentFixture<CheckOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
