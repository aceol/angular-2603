import { Component, input, output } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  addToBasket = output<Product>();
}
