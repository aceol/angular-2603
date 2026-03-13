import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBasket } from './empty';

describe('Empty', () => {
  let component: EmptyBasket;
  let fixture: ComponentFixture<EmptyBasket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyBasket],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyBasket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
