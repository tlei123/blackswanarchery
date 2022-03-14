import { AppState } from './models/app-state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import * as svActions from './store/actions/splash-video.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Black Swan Archery';

  routerState$: Observable<object>;
  splashVideoState$: Observable<object>;
  routerStateSub: Subscription;
  splashVideoStateSub: Subscription;

  routerStateObserver = {
    next: (x: object) =>
      // Add methods as needed to react to state changes, then call them from here.
      // If only template-display changes are needed, then just reference the state-observables directly from the template using ... | async.
      {
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
      // Add methods as needed to react to state changes, then call them from here.
      // If only template-display changes are needed, then just reference the state-observables directly from the template using ... | async.
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

  constructor(private store: Store<AppState>) {
    this.splashVideoState$ = store.select('splashVideo');
    this.routerState$ = store.select('router');
  }

  ngOnInit(): void {
    // Subscribe to state-observables in case functional code needs to perform tasks upon state-changes.
    // Add methods and call them from observer objects above.
    this.routerStateSub = this.routerState$.subscribe(this.routerStateObserver);
    this.splashVideoStateSub = this.splashVideoState$.subscribe(
      this.splashVideoStateObserver,
    );
  }

  ngOnDestroy(): void {
    if (this.routerStateSub) {
      this.routerStateSub.unsubscribe();
    }
    if (this.splashVideoStateSub) {
      this.splashVideoStateSub.unsubscribe();
    }
  }

  finishSplashVideo() {
    this.store.dispatch(svActions.finish());
  }

  resetSplashVideo() {
    this.store.dispatch(svActions.reset());
  }
}
