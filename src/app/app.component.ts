import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  closeSplashVideo,
  endSplashVideo,
  resetSplashVideo,
  skipSplashVideo,
} from './store/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blackswanarchery';

  app$: Observable<object>;
  count$: Observable<number>;

  constructor(private store: Store<{ app: object; count: number }>) {
    this.app$ = store.select('app');
  }

  closeSplash() {
    this.store.dispatch(closeSplashVideo());
  }

  endSplash() {
    this.store.dispatch(endSplashVideo());
  }

  skipSplash() {
    this.store.dispatch(skipSplashVideo());
  }

  resetSplash() {
    this.store.dispatch(resetSplashVideo());
  }
}
