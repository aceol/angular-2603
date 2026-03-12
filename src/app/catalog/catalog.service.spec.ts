import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { Product } from '../product/product';

describe('CatalogService', () => {
   let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
    service['_products'].set([{ id: 'welsch', stock: 2 }] as Product[]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check has product in stock if it does', () => {
    // Given
    // When
    // Then
    expect(service.hasProductsInStock()).toBeTruthy();
  });

    it('should check no product in stock if it does not', () => {
    // Given
    service['_products'].set([]);

    // When
    // Then
    expect(service.hasProductsInStock()).toBeFalsy();
  });

  it('should decrease the product stock', () => {
    // Given
    expect(service.products()[0].stock).toBe(2);

    // When
    service.decreaseStock('welsch');

    // Then
    expect(service.products()[0].stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    // Given
    expect(service.products()[0].stock).toBe(2);

    // When
    service.decreaseStock('welsch');
    // Then
    expect(service.products()[0].stock).toBe(1);

    // When
    service.decreaseStock('welsch');
    // Then
    expect(service.products()[0].stock).toBe(0);

    // When
    service.decreaseStock('welsc');
    // Then
    expect(service.products()[0].stock).toBe(0);
  });
});
