import { Component, inject, Signal } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  basketService = inject(BasketService);
  
  constructor() {
    this.basketService.fetchBasket().subscribe();
  }

  get cartItems(): Signal<number> {
    return this.basketService.count;
  }

}
