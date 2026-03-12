import { CUSTOM_ELEMENTS_SCHEMA, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { ProductCard } from './product/product-card';
import { Product } from './product/product';
import { BasketService } from './basket/basket.service';
import { BasketStubService } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogStubService } from './catalog/catalog.service.stub';
import { APP_TITLE } from './app.token';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let basketService: BasketService;
  let catalogService: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: BasketService,
          useClass: BasketStubService,
        },
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: APP_TITLE, useValue: 'The App Title' },
      ],
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
    catalogService = TestBed.inject(CatalogService);
    basketService = TestBed.inject(BasketService);
  });

  it('should display the products', () => {
    //given
    (catalogService.products as WritableSignal<Product[]>).set([
      { id: '1', stock: 1 },
      { id: '2', stock: 1 },
      { id: '3', stock: 1 },
      { id: '4', stock: 1 },
    ] as Product[]);
    

    fixture.detectChanges();
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(productDebugElements).toHaveLength(4);
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products()[index]);
    });
  });

  it('should not display products whose stock is empty', () => {
    (catalogService.products as WritableSignal<Product[]>).set([
      { id: '1', stock: 0 },
      { id: '2', stock: 0 },
      { id: '3', stock: 1 },
      { id: '4', stock: 1 },
    ] as Product[]);

    fixture.detectChanges();

    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    // When
    // Then
    expect(productDebugElements).toHaveLength(2);
    expect(productDebugElements[0].properties['product']).toBe(component.products()[2]);
    expect(productDebugElements[1].properties['product']).toBe(component.products()[3]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    (catalogService.hasProductsInStock as WritableSignal<boolean>).set(true);
    fixture.detectChanges();
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (catalogService.hasProductsInStock as WritableSignal<boolean>).set(false);
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });

    it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    fixture.detectChanges();
    vi.spyOn(catalogService, 'decreaseStock');
    vi.spyOn(basketService, 'addItem');

    const productDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productDebugElement.triggerEventHandler('addToBasket', component.products()[0]);

    // Then
    const { id, title, price } = component.products()[0];
    expect(catalogService.decreaseStock).toHaveBeenCalledWith(id);
    expect(basketService.addItem).toHaveBeenCalledWith({ id, title, price });
  });

});
