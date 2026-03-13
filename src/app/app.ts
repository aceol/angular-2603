import { Component, inject, Signal } from '@angular/core';
import { ProductCard } from './product/product-card';
import { Product } from './product/product';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ProductCard, CurrencyPipe, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isHovered = false;
  catalogService = inject(CatalogService);
  basketService = inject(BasketService);
  title = inject(APP_TITLE);

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  toggleIsHovered(): void {
    this.isHovered = !this.isHovered;
  }

  get products() {
    return this.catalogService.products;
  }

  get cartItems(): Signal<number> {
    return this.basketService.count;
  }

  get total(): Signal<number> {
    return this.basketService.total;
  }

  updateTotal({id, title, price}: Product) {
    this.basketService.addItem(id).subscribe(
         () => this.catalogService.decreaseStock(id)
    );
  }

  get hasProductsInStock(): Signal<boolean> {
    return this.catalogService.hasProductsInStock;
  }
}
