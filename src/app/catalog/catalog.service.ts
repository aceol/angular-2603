import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  httpClient = inject(HttpClient)

  private _products = signal<Product[]>([]);

  products = this._products.asReadonly();

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8081/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }

  hasProductsInStock = computed(() =>
    this.products().some((product: Product) => product.stock > 0),
  );

  decreaseStock(productId: string) {
    this._products.update((products: Product[]) =>
      products.map((product: Product) => {
        if (product.id === productId && product.stock > 0) {
          return { ...product, stock: product.stock - 1 } as Product;
        } else {
          return product;
        }
      }),
    );
  }
}
