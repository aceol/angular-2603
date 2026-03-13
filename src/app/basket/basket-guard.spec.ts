import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { BasketItem } from './basket-item';
import { basketGuard } from './basket-guard';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';

describe('basketGuard', () => {
  const _executeGuard: CanMatchFn = (route, segments) =>
    TestBed.runInInjectionContext(() => basketGuard(route, segments));

  const executeGuard = () => _executeGuard({} as Route, []) as Observable<boolean>;

  let basketService: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BasketService, useClass: BasketStubService }],
    });

    basketService = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should fetch items', () => {
    const fetchItemsSpy = vi.spyOn(basketService, 'fetchBasket');

    executeGuard();

    expect(fetchItemsSpy).toHaveBeenCalled();
  });

  it('should return false when the basket is empty', async () => {
    const result = await firstValueFrom(executeGuard());
    expect(result).toBe(false);
  });

  it('should return true when the basket is not empty', async () => {
    vi.spyOn(basketService, 'fetchBasket').mockReturnValue(of([{} as BasketItem]));

    const result = await firstValueFrom(executeGuard());
    expect(result).toBe(true);
  });
});
