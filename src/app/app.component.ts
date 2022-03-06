import { AppState } from './models/app-state.model';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as svActions from './store/actions/splash-video.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blackswanarchery';

  svState$: Observable<object>;
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.svState$ = store.select('splashVideo');
  }

  closeSplashVideo() {
    this.store.dispatch(svActions.close());
  }

  endSplashVideo() {
    this.store.dispatch(svActions.end());
  }

  skipSplashVideo() {
    this.store.dispatch(svActions.skip());
  }

  resetSplashVideo() {
    this.store.dispatch(svActions.reset());
  }
}
