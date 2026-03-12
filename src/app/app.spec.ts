import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { ProductCard } from './product-card/product-card';
import { Product } from './product-card/product';

describe('App (second approach - allowing unknown HTML elements)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
    }).overrideComponent(App, {
      remove: {
        imports: [ProductCard],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    fixture.detectChanges();
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(productDebugElements).toHaveLength(4);

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products[index]);
    });
  });

  // ----- DOM Testing (the hard way) -----
  it('should update the total when a product emits the "addToBasket" event', () => {
    // Given
    component.total = 99;
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);

    // When
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    productDebugElements[1].triggerEventHandler('addToBasket', component.products[1]);
    fixture.detectChanges();

    // Then
    expect(header?.textContent).toContain(99 + component.products[1].price);
  });

  // ----- Class Testing (the easy way) -----
  it('should update the total when "updateTotal" class method is called', () => {
    // Given
    component.total = 99;

    // When
    component.updateTotal(component.products[1]);

    // Then
    expect(component.total).toBe(99 + component.products[1].price);
  });


  it('should decrease the stock of the product added to the basket', () => {
    const product = component.products[0];
    // Given

    expect(product.stock).toBe(2);

    // When
    const productDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productDebugElement.triggerEventHandler('updateTotal', product);

    // Then
    expect(product.stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    // Given
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements).toHaveLength(4);

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements).toHaveLength(2);
    expect(productDebugElements[0].properties['product']).toBe(component.products[2]);
    expect(productDebugElements[1].properties['product']).toBe(component.products[3]);
  });

  it.only('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    component.products = [{ stock: 0 } as Product];
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
