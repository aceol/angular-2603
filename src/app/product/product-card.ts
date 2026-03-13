import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  addToBasket = output<Product>();
}
