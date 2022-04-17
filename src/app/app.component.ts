import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { environment } from './../environments/environment';
import { AppState } from './models/app-state.model';
import { SplashVideoState } from './models/splash-video-state.model';
import { FiguresState } from './models/figures-state.model';
import * as svActions from './store/actions/splash-video.actions';
import * as figsActions from './store/actions/figures.actions';
import {
  selectFigures,
  selectFiguresByView,
} from './store/selectors/figures.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Black Swan Archery';
  formMailAction = environment.formMail.action;
  formMailRecipients = environment.formMail.recipients;

  routerState$: Observable<object>;
  splashVideoState$: Observable<SplashVideoState>;
  figuresState$: Observable<FiguresState>;
  homeFiguresState$: Observable<object>;
  view2FiguresState$: Observable<object>;
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

  constructor(
    private store: Store<AppState>,
    private gtmSvc: GoogleTagManagerService,
  ) {
    this.routerState$ = store.select('router');
    this.splashVideoState$ = store.select('splashVideo');
    this.figuresState$ = store.select(selectFigures);
    this.homeFiguresState$ = store.select(selectFiguresByView('home'));
    this.view2FiguresState$ = store.select(selectFiguresByView('view2'));
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
    this.gtmSvc.addGtmToDom();
  }

  ngOnDestroy(): void {
    if (this.routerStateSub) {
      this.routerStateSub.unsubscribe();
    }
    if (this.splashVideoStateSub) {
      this.splashVideoStateSub.unsubscribe();
    }
    if (this.figuresStateSub) {
      this.figuresStateSub.unsubscribe();
    }
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
