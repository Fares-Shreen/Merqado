import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeslider } from './homeslider';

describe('Homeslider', () => {
  let component: Homeslider;
  let fixture: ComponentFixture<Homeslider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeslider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeslider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
