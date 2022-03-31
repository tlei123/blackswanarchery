import { TestBed } from '@angular/core/testing';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  GoogleTagManagerModule,
  GoogleTagManagerService,
} from 'angular-google-tag-manager';

import { AppComponent } from './app.component';
import { SmartFigureComponent } from './shared/smart-figure/smart-figure.component';
import { mockInitialAppState as initialState } from './testing/mocks/mock-app-state';
import * as svActions from './store/actions/splash-video.actions';
import { MockGoogleTagManagerService } from './testing/mocks/mock-gtm-svc';

describe('AppComponent', () => {
  let store: MockStore;
  let gtmSvc: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, GoogleTagManagerModule],
      declarations: [AppComponent, SmartFigureComponent],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        {
          provide: GoogleTagManagerService,
          useClass: MockGoogleTagManagerService,
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    gtmSvc = TestBed.inject(GoogleTagManagerService);
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

  describe('GTM', () => {
    it('should call pushGtmTag method on button click', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const pushGtmTagMethodSpy = spyOn(app, 'pushGtmTag');
      let tagButton = fixture.debugElement.nativeElement.querySelector(
        '[data-testid="btnCustomEvent"]',
      );

      tagButton.click();

      expect(pushGtmTagMethodSpy).toHaveBeenCalled();
    });
    it('should call gtmSvc pushTag method from pushGtmTag', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const gtmPushTagMethodSpy = spyOn(gtmSvc, 'pushTag');
      const triggerName = 'test-trigger';

      app.pushGtmTag(triggerName);

      expect(gtmPushTagMethodSpy).toHaveBeenCalledWith({ event: triggerName });
    });
  });
});
