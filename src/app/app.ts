import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCard } from './product-card/product-card';
import { Product } from './product-card/product';

@Component({
  selector: 'app-root',
  imports: [ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isHovered = false;
  protected readonly title = 'Zenika Shop'; //signal('zenika-ng-website');
  total = signal(0);
  cartItems = signal(0);

  toggleIsHovered(): void {
    this.isHovered = !this.isHovered;
  }

  updateTotal(product: Product) {
    this.total.update((price) => price + product.price);
    this.cartItems.update((nbItemsInCart) => ++nbItemsInCart);

    this.products.update((products: Product[]) => {
      return products.map((currentProduct: Product) => {
        if (currentProduct.id === product.id) {
          return { ...product, stock: product.stock - 1 } as Product;
        } else {
          return currentProduct;
        }
      });
    });
  }

  hasProductsInStock = computed(() => this.products().some((product) => product.stock > 0));

  // get hasProductsInStock(): Signal<boolean> {
  //   return computed(() => this.products().some((product) => product.stock > 0));
  // }

  products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);
}
