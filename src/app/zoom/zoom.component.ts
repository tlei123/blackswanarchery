import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { appConfig } from './../app.config';
import { AppState } from './../models/app-state.model';
import { ZoomState } from './../models/zoom-state.model';
import { Figure } from './../models/figure.model';
import { selectZoomState } from './../store/selectors/zoom.selectors';
import { getImageClasshook } from './../utils/get-image-classhook';
import { closeZoom, changeZoom } from './../store/actions/zoom.actions';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit, OnDestroy {
  appImagesDir = appConfig.dirs.images;
  zoomImagesSubdir = 'zoom/';
  zoomState$: Observable<object>;
  zoomStateSub: Subscription;
  currentFigures: Figure[];
  currentFigure: Figure;
  previousFigure: Figure;
  nextFigure: Figure;

  zoomStateObserver = {
    next: (zState: ZoomState) => {
      console.info('[Zoom.zoomStateObserver] zState:', zState);
      if (zState.isOpen) {
        this.currentFigures = zState.currentViewZoomableFigures;
        this.currentFigure = this.getFigureByZoomFilename(
          zState.currentZoomImageFilename,
        );
        this.previousFigure = this.getPreviousFigure(this.currentFigure);
        this.nextFigure = this.getNextFigure(this.currentFigure);
      }
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

  getFigureByZoomFilename(zoomFilename: string) {
    return this.currentFigures.find(
      (f) => f.zoomImageFilename === zoomFilename,
    );
  }

  getPreviousFigure(currentFigure: Figure): Figure {
    return this.currentFigures[this.currentFigures.indexOf(currentFigure) - 1];
  }

  getNextFigure(currentFigure: Figure): Figure {
    return this.currentFigures[this.currentFigures.indexOf(currentFigure) + 1];
  }

  onPreviousClick(previousFigure: Figure) {
    this.store.dispatch(
      changeZoom({ zoomImageFilename: previousFigure.zoomImageFilename }),
    );
  }

  onNextClick(nextFigure: Figure) {
    this.store.dispatch(
      changeZoom({ zoomImageFilename: nextFigure.zoomImageFilename }),
    );
  }

  onCloseClick() {
    console.info('[Zoom.onCloseClick] Close button clicked!');
    this.store.dispatch(closeZoom());
  }
}
