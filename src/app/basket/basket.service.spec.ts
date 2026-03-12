import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import { BasketItem } from './basket-item';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should compute the total of prices', () => {
    // Given
    service['_items'].set([{ price: 90 }, { price: 9 }] as BasketItem[]);

    // When
    // Then
    expect(service.total()).toBe(99);
  });

  it('should count the total of items', () => {
    // Given
    service['_items'].set([{}, {}] as BasketItem[]);

    // When
    // Then
    expect(service.count()).toBe(2);
  });

  it('should update items when item added', () => {
    // Given
    expect(service.items()).toHaveLength(0);

    // When
    service.addItem({ id: 'ID_1', title: 'TITLE_1', price: 1 });
    // Then
    expect(service.items()).toHaveLength(1);
    expect(service.items()[0].id).toBe('ID_1');

    // When
    service.addItem({ id: 'ID_2', title: 'TITLE_2', price: 2 });
    // Then
    expect(service.items()).toHaveLength(2);
    expect(service.items()[1].id).toBe('ID_2');
  });
});
