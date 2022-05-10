import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from './../models/app-state.model';
import { ZoomState } from './../models/zoom-state.model';
import { selectZoomState } from './../store/selectors/zoom.selectors';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit, OnDestroy {
  zoomState$: Observable<object>;
  zoomStateSub: Subscription;

  zoomStateObserver = {
    next: (zState: ZoomState) => {
      console.info('[Zoom.zoomStateObserver] zState:', zState);
    },
    error: (err: Error) => {
      console.error('[Zoom.currentBreakpointObserver] Got an error:', err);
    },
    complete: () => {},
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.zoomState$ = this.store.select(selectZoomState);
    this.zoomStateSub = this.zoomState$.subscribe(this.zoomStateObserver);
  }

  ngOnDestroy(): void {
    if (this.zoomStateSub) {
      this.zoomStateSub.unsubscribe();
    }
  }
}
