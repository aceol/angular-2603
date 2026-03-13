import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { BasketService } from "./basket.service";
import { map } from "rxjs";

export const basketGuard: CanMatchFn = () => {
  const basketService = inject(BasketService);
  return basketService.fetchBasket().pipe(map(items => items.length > 0));
};