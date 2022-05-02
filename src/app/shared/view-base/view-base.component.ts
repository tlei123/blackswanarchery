import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from './../../models/app-state.model';
import { selectCurrentBreakpoint } from './../../store/selectors/browser.selectors';
import { selectFiguresByView } from './../../store/selectors/figures.selectors';
import { Figure } from './../../models/figure.model';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // copy to instance-component [life-cycle methods are not inherited]
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('view-base'));
    document.title = `View-Base | ${this.appName}`;
  }

  getImageClasshook(imageFilename: string): string {
    return imageFilename.match(/-/g).length === 2
      ? imageFilename.substring(0, imageFilename.lastIndexOf('-'))
      : imageFilename.substring(0, imageFilename.indexOf('.'));
  }

  onZoomableImageClick(figure: Figure) {
    console.log('[App.onZoomableImageClick] figure:', figure);
  }
}
