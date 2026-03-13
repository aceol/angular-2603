import { Routes } from '@angular/router';
import { Basket } from './basket/basket';
//import { basketGuard } from './basket/basket.guard';
import { Catalog } from './catalog/catalog';
import { EmptyBasket } from './basket/empty';
import { basketGuard } from './basket/basket-guard';
//import { PRODUCT_DETAILS_PARAM_KEY } from './product/product-details/product-details.config';

export const routes: Routes = [
  {
    path: 'catalog',
    component: Catalog,
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product/product-details/product-details'),
  },
   {
    path: 'basket',
    component: Basket,
    canMatch: [basketGuard],
  },
  {
    path: 'basket',
    component: EmptyBasket,
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];
