import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '@models/app-state.model';
import { selectCurrentBreakpoint } from '@store/selectors/browser.selectors';
import {
  selectFiguresByView,
  selectGifsByView,
} from '@store/selectors/assets.selectors';
import { Figure } from '@models/figure.model';
import * as utils from '@utils/index';
import { openZoom, setZoomableViewFigures } from '@store/actions/zoom.actions';

// extend this base-component to create view-components ("pages" rendered in AppComponent template's <router-outlet/>)

@Component({
  selector: 'app-view-base',
  // copy markup into instance-component template [or save-as & overwrite (replace) that template]
  templateUrl: './view-base.component.html',
  // import into instance-component stylesheet
  styleUrls: ['./view-base.component.scss'],
})
export class ViewBaseComponent implements OnInit, OnDestroy {
  @Input() appGifsDir: string;
  @Input() appImagesDir: string;
  @Input() appName: string;
  @Input() appVideosDir: string;

  currentBreakpoint$: Observable<string>;
  viewFigures$: Observable<object>;
  viewGifs$: Observable<object>;
  viewFiguresSub: Subscription;
  viewFiguresObserver = {
    next: (viewFigures: Figure[]) => {
      if (viewFigures) {
        this.store.dispatch(
          setZoomableViewFigures({
            zoomableViewFigures: viewFigures.filter(
              (fig) => fig.zoomImageFilename !== undefined,
            ),
          }),
        );
      }
    },
    error: (err: Error) => {
      console.error('[ViewBase.viewFiguresObserver] Got an error:', err);
    },
    complete: () => {},
  };
  /* COPY & OVERRIDE in instance-component */
  viewImagesSubdir = 'view-base/';
  viewGifsSubdir = 'view-base/';
  /* END COPY & OVERRIDE */

  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    /* COPY to instance-component [life-cycle methods are not inherited] */
    document.title = `View-Base | ${this.appName}`;
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('view-base'));
    this.viewGifs$ = this.store.select(selectGifsByView('view-base'));
    this.viewFiguresSub = this.viewFigures$.subscribe(this.viewFiguresObserver);
    /* END COPY */
  }

  ngOnDestroy(): void {
    /* COPY to instance-component [life-cycle methods are not inherited] */
    if (this.viewFiguresSub) {
      this.viewFiguresSub.unsubscribe();
    }
    /* END COPY */
  }

  // methods below are inherited by instance-component
  // no need to copy
  // can be overridden though

  getImgClasshook(imgFilename: string): string {
    return utils.getImageClasshook(imgFilename);
  }

  onZoomableImageClick(zoomData: any) {
    console.log('[ViewBase.onZoomableImageClick] zoomData:', zoomData);
    this.store.dispatch(openZoom({ zoomData }));
  }
}
