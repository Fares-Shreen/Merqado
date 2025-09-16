import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetcode } from './resetcode';

describe('Resetcode', () => {
  let component: Resetcode;
  let fixture: ComponentFixture<Resetcode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resetcode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resetcode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
