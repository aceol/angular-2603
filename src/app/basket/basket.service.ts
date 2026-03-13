import { computed, inject, Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  httpClient = inject(HttpClient)
  private _items = signal<BasketItem[]>([]);

  items = this._items.asReadonly();

  total = computed<number>(() =>
    this._items().reduce((total, current) => total + current.price, 0),
  );
  count = computed<number>(() => this._items().reduce((total, _) => total + 1, 0));

  fetchBasket(): Observable<BasketItem[]> {
      return this.httpClient
        .get<Product[]>('http://localhost:8081/api/basket')
        .pipe(tap((products) => {
          this._items.set(products)
        }));
    }

    addItem(productId: string): Observable<BasketItem> {
    return this.httpClient
      .post<BasketItem>('http://localhost:8081/api/basket', { productId })
      .pipe(tap((item) => this._items.update((items) => [...items, item])));
  }
}
