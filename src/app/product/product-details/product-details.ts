import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { Product } from '../product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{
  id = input.required<string>();
  productSignal = signal<Product | undefined>(undefined);

  catalogService = inject(CatalogService);

  ngOnInit(): void {
    this.catalogService.getProduct(this.id()).subscribe((product) =>this.productSignal.set(product));
  }
}
export default ProductDetails;
