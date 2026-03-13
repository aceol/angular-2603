import { Component, inject, Signal } from '@angular/core';
import { ProductCard } from './product/product-card';
import { Product } from './product/product';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { BasketItem } from './basket/basket-item';
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
    this.catalogService.decreaseStock(id);
    this.basketService.addItem({id, title, price} as BasketItem);
  }

  get hasProductsInStock(): Signal<boolean> {
    return this.catalogService.hasProductsInStock;
  }
}
