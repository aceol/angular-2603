import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
