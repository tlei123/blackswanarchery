import { AppState } from './models/app-state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { SplashVideoState } from './models/splash-video-state.model';
import { FiguresState } from './models/figures-state.model';
import * as svActions from './store/actions/splash-video.actions';
import * as figsActions from './store/actions/figures.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Black Swan Archery';

  routerState$: Observable<object>;
  splashVideoState$: Observable<SplashVideoState>;
  figuresState$: Observable<FiguresState>;
  routerStateSub: Subscription;
  splashVideoStateSub: Subscription;
  figuresStateSub: Subscription;

  /* Observers here subscribe to state observables, in case app needs to react to state changes.
  Call methods from within next/error/complete callback.
  If only template-display changes are needed, then just reference the state-observables directly from the template using ... | async.
  */
  routerStateObserver = {
    next: (x: object) => {
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
    next: (x: object) => {
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
  figuresStateObserver = {
    next: (x: object) => {
      console.log('[App.figuresStateObserver] Got a next value:', x);
    },
    error: (err: Error) => {
      console.error('[App.figuresStateObserver] Got an error:', err);
    },
    complete: () => {
      console.log('[App.figuresStateObserver] Got a complete notification:');
    },
  };

  constructor(private store: Store<AppState>) {
    this.routerState$ = store.select('router');
    this.splashVideoState$ = store.select('splashVideo');
    this.figuresState$ = store.select('figures');
  }

  ngOnInit(): void {
    this.store.dispatch(figsActions.loadFigures());
    // Subscribe to state-observables in case functional code needs to perform tasks upon state-changes.
    // Add methods and call them from observer objects above.
    this.routerStateSub = this.routerState$.subscribe(this.routerStateObserver);
    this.splashVideoStateSub = this.splashVideoState$.subscribe(
      this.splashVideoStateObserver,
    );
    this.figuresStateSub = this.figuresState$.subscribe(
      this.figuresStateObserver,
    );
  }

  ngOnDestroy(): void {
    this.routerStateSub.unsubscribe();
    this.splashVideoStateSub.unsubscribe();
    this.figuresStateSub.unsubscribe();
  }

  finishSplashVideo() {
    this.store.dispatch(svActions.finish());
  }

  resetSplashVideo() {
    this.store.dispatch(svActions.reset());
  }
}
