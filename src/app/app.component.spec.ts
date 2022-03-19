import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from './models/app-state.model';
import { AppComponent } from './app.component';
import { SmartFigureComponent } from './shared/smart-figure/smart-figure.component';
import * as svActions from './store/actions/splash-video.actions';

describe('AppComponent', () => {
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
    figures: {
      home: [],
      view2: [],
    },
  };
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, SmartFigureComponent],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.setState(initialState);
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

  describe('Finish splash-video', () => {
    it('should call finishSplashVideo method on Finish button click', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const finishMethodSpy = spyOn(app, 'finishSplashVideo');
      let finishButton = fixture.debugElement.nativeElement.querySelector(
        '[data-testid="btnFinishSplashVideo"]',
      );

      finishButton.click();
      store.refreshState();

      expect(finishMethodSpy).toHaveBeenCalled();
    });
    it('should dispatch Finish action from finishSplashVideo method', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const dispatchSpy = spyOn(store, 'dispatch');
      const expectedAction = svActions.finish();

      app.finishSplashVideo();
      store.refreshState();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('Reset splash-video', () => {
    it('should call resetSplashVideo method on Reset button click', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const resetMethodSpy = spyOn(app, 'resetSplashVideo');
      let resetButton = fixture.debugElement.nativeElement.querySelector(
        '[data-testid="btnResetSplashVideo"]',
      );

      resetButton.click();
      store.refreshState();

      expect(resetMethodSpy).toHaveBeenCalled();
    });
    it('should dispatch Reset action from resetSplashVideo method', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const dispatchSpy = spyOn(store, 'dispatch');
      const expectedAction = svActions.reset();

      app.resetSplashVideo();
      store.refreshState();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
