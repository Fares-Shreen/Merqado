import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryslider } from './categoryslider';

describe('Categoryslider', () => {
  let component: Categoryslider;
  let fixture: ComponentFixture<Categoryslider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryslider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryslider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
