import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { environment } from './../environments/environment';
import { appConfig } from './app.config';
import { AppState } from './models/app-state.model';
import {
  debounce,
  getCurrentBreakpoint,
  getImageClasshook,
} from './utils/index';
import { BrowserState } from './models/browser-state.model';
import { SplashVideoState } from './models/splash-video-state.model';
import { changeBreakpoint } from './store/actions/browser.actions';
import * as svActions from './store/actions/splash-video.actions';
import * as assetsActions from './store/actions/assets.actions';
import { AssetsState } from './models/assets-state.model';
import { Figure } from './models/figure.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  breakpoints = appConfig.breakpoints;
  currentBreakpoint: string;
  gifsDir = appConfig.dirs.gifs;
  imagesDir = appConfig.dirs.images;
  videosDir = appConfig.dirs.videos;
  name = appConfig.name;
  formMailAction = environment.formMail.action;
  formMailRecipients = environment.formMail.recipients;

  browserState$: Observable<object>;
  routerState$: Observable<object>;
  splashVideoState$: Observable<SplashVideoState>;
  assetsState$: Observable<object>;
  browserStateSub: Subscription;
  routerStateSub: Subscription;
  splashVideoStateSub: Subscription;
  assetsStateSub: Subscription;
  homeFigures: Figure[];
  viewbaseFigures: Figure[];

  /* Observers here subscribe to state observables, in case app needs to react to state changes.
  Call methods from within next/error/complete callback.
  If only template-display changes are needed, then just reference the state-observables directly from the template using ... | async.
  */
  browserStateObserver = {
    next: (x: BrowserState) => {
      console.log('[App.browserStateObserver] Got a next value:', x);
      this.currentBreakpoint = x.currentBreakpoint;
    },
    error: (err: Error) => {
      console.error('[App.browserStateObserver] Got an error:', err);
    },
    complete: () => {
      console.log('[App.browserStateObserver] Got a complete notification:');
    },
  };
  routerStateObserver = {
    next: (x: any) => {
      console.log('[App.routerStateObserver] Got a next value:', x);
    },
    error: (err: Error) => {
      console.error('[App.routerStateObserver] Got an error:', err);
    },
    complete: () => {
      console.log('[App.routerStateObserver] Got a complete notification:');
    },
  };
  splashVideoStateObserver = {
    next: (x: SplashVideoState) => {
      console.log('[App.splashVideoStateObserver] Got a next value:', x);
    },
    error: (err: Error) => {
      console.error('[App.splashVideoStateObserver] Got an error:', err);
    },
    complete: () => {
      console.log(
        '[App.splashVideoStateObserver] Got a complete notification:',
      );
    },
  };
  assetsStateObserver = {
    next: (x: AssetsState) => {
      console.log('[App.assetsStateObserver] Got a next value:', x);
      if (x.figures) {
        this.homeFigures = x.figures.home;
        this.viewbaseFigures = x.figures['view-base'];
      }
    },
    error: (err: Error) => {
      console.error('[App.assetsStateObserver] Got an error:', err);
    },
    complete: () => {
      console.log('[App.assetsStateObserver] Got a complete notification:');
    },
  };

  constructor(
    private store: Store<AppState>,
    private gtmSvc: GoogleTagManagerService,
  ) {
    this.browserState$ = store.select('browser');
    this.routerState$ = store.select('router');
    this.splashVideoState$ = store.select('splashVideo');
    this.assetsState$ = store.select('assets');
  }

  ngOnInit(): void {
    this.currentBreakpoint = getCurrentBreakpoint();
    this.store.dispatch(assetsActions.loadAssets());
    this.store.dispatch(
      changeBreakpoint({ breakpoint: getCurrentBreakpoint() }),
    );
    // Subscribe to state-observables in case functional code needs to perform tasks upon state-changes.
    // Add methods and call them from observer objects above.
    this.browserStateSub = this.browserState$.subscribe(
      this.browserStateObserver,
    );
    this.routerStateSub = this.routerState$.subscribe(this.routerStateObserver);
    this.splashVideoStateSub = this.splashVideoState$.subscribe(
      this.splashVideoStateObserver,
    );
    this.assetsStateSub = this.assetsState$.subscribe(this.assetsStateObserver);
    this.gtmSvc.addGtmToDom();
    window.onresize = debounce(() => {
      const newBrkpt = getCurrentBreakpoint();
      if (newBrkpt !== this.currentBreakpoint) {
        this.store.dispatch(changeBreakpoint({ breakpoint: newBrkpt }));
      }
    }, 250);
  }

  ngOnDestroy(): void {
    if (this.routerStateSub) {
      this.routerStateSub.unsubscribe();
    }
    if (this.splashVideoStateSub) {
      this.splashVideoStateSub.unsubscribe();
    }
    if (this.assetsStateSub) {
      this.assetsStateSub.unsubscribe();
    }
  }

  onOutletActivated(component) {
    component.appGifsDir = this.gifsDir;
    component.appImagesDir = this.imagesDir;
    component.appName = this.name;
    component.appVideosDir = this.videosDir;
  }

  finishSplashVideo() {
    this.store.dispatch(svActions.finish());
  }

  resetSplashVideo() {
    this.store.dispatch(svActions.reset());
  }

  pushGtmTag(eventTrigger: string) {
    const gtmTag = {
      event: eventTrigger,
    };
    this.gtmSvc.pushTag(gtmTag);

    alert(`this is a mocked tag: ${eventTrigger}`);
  }
}
