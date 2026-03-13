import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  httpClient = inject(HttpClient)

  private _products = signal<Product[] | undefined>(undefined);

  products = this._products.asReadonly();

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8081/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient
      .get<Product>(`http://localhost:8081/api/products/${id}`)
  }

  hasProductsInStock = computed(() =>
    this.products()?.some((product: Product) => product.stock > 0),
  );

  decreaseStock(productId: string) {
    this._products.update((products: Product[] | undefined) =>
      (products?? []).map((product: Product) => {
        if (product.id === productId && product.stock > 0) {
          return { ...product, stock: product.stock - 1 } as Product;
        } else {
          return product;
        }
      }),
    );
  }
}
