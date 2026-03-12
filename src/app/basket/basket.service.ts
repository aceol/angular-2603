import { computed, Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items = signal<BasketItem[]>([]);

  items = this._items.asReadonly();

  total = computed<number>(() =>
    this._items().reduce((total, current) => total + current.price, 0),
  );
  count = computed<number>(() => this._items().reduce((total, _) => total + 1, 0));

  addItem(item: BasketItem) {
    this._items.update((items) => [...items, item]);
  }
}
