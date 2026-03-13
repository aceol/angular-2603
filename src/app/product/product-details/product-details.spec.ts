import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails } from './product-details';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Product } from '../product';

describe.only('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: HttpClient,
          useValue: { get: () => of({} as Product) },
        },
      ],
      imports: [ProductDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;

  });

  it('should create', async () => {
    fixture.componentRef.setInput('id', 'yep');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
