import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from './../../models/app-state.model';
import { selectCurrentBreakpoint } from './../../store/selectors/browser.selectors';
import { selectFiguresByView } from './../../store/selectors/figures.selectors';
import { Figure } from './../../models/figure.model';
import { getImageClasshook } from './../../utils';

// extend this base-component to create view-components ("pages" rendered in AppComponent template's <router-outlet/>)

@Component({
  selector: 'app-view-base',
  // copy markup into instance-component template [or save-as & overwrite (replace) that template]
  templateUrl: './view-base.component.html',
  // copy template-rules into instance-component stylesheet [or save-as like above]
  styleUrls: ['./view-base.component.scss'],
})
export class ViewBaseComponent implements OnInit {
  @Input() appGifsDir: string;
  @Input() appImagesDir: string;
  @Input() appName: string;
  @Input() appVideosDir: string;

  currentBreakpoint$: Observable<string>;
  viewFigures$: Observable<object>;
  viewImagesSubdir = 'view-base/';

  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    /* COPY to instance-component [life-cycle methods are not inherited] */
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('view-base'));
    document.title = `View-Base | ${this.appName}`;
    /* END COPY */
  }

  // methods below are inherited by instance-component
  // no need to copy
  // can be overridden though

  getClasshook(imgFilename: string): string {
    return getImageClasshook(imgFilename);
  }

  onZoomableImageClick(figure: Figure) {
    console.log('[App.onZoomableImageClick] figure:', figure);
  }
}
