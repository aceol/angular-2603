import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  imports: [],
  templateUrl: './basket.html',
  styleUrl: './basket.css',
})
export class Basket {
  
  get basket() {
    return this.basketService.items;
  }

  basketService = inject(BasketService);
}
