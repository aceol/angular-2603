import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Product } from '../product/product';
import { ProductCard } from '../product/product-card';
import { CatalogService } from './catalog.service';
import { APP_TITLE } from '../app.token';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {

  isHovered = false;
  title = inject(APP_TITLE);

  toggleIsHovered(): void {
    this.isHovered = !this.isHovered;
  }

  catalogService = inject(CatalogService);
  basketService = inject(BasketService);
  
  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }
  
  get products() {
    return this.catalogService.products;
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
