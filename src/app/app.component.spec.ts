import { TestBed } from '@angular/core/testing';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from './models/app-state.model';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let store: MockStore;

  const initialState: AppState = {
    router: {
      state: {
        root: {
          children: [],
          data: {},
          outlet: 'primary',
          params: {},
          queryParams: {},
          url: [],
        },
        url: '/',
      },
      navigationId: 1,
    },
    splashVideo: {
      done: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Black Swan Archery'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Black Swan Archery');
  });

  it('should call closeSplashVideo method on close button click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const closeMethodSpy = spyOn(app, 'closeSplashVideo');
    let closeButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="btnCloseSplashVideo"]',
    );

    closeButton.click();
    fixture.detectChanges();
    expect(closeMethodSpy).toHaveBeenCalled();
  });
});
