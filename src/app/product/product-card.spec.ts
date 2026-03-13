import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { provideRouter } from '@angular/router';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', {
      title: 'TITLE',
      description: 'DESC',
      price: 20,
      stock: 2,
      photo: 'url',
    });
    fixture.detectChanges();
  });

  it('should display the product photo as image url', () => {
    //given
    const img = fixture.nativeElement.querySelector('img');
    //when
    //then
    expect(img.getAttribute('src')).toBe('url');
  });

  it('should display the product title', () => {
    //given
    const title = fixture.nativeElement.querySelector('small');
    //when
    //then
    expect(title.textContent).toBe('TITLE');
  });

  it('should display the product description', () => {
    //given
    const p = fixture.nativeElement.querySelector('p');
    //when
    //then
    expect(p.textContent).toContain(20);
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    //given
    const button = fixture.nativeElement.querySelector('button');
    vi.spyOn(component.addToBasket, 'emit');

    //when
    button.click();
    //then
    expect(component.addToBasket.emit).toHaveBeenCalledExactlyOnceWith({
      title: 'TITLE',
      description: 'DESC',
      price: 20,
      stock: 2,
      photo: 'url',
    });
  });
});
