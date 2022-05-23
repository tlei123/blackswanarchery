import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ViewBaseComponent } from './../../shared/view-base/view-base.component';
import { AppState } from 'src/app/models/app-state.model';
import { selectCurrentBreakpoint } from 'src/app/store/selectors/browser.selectors';
import {
  selectFiguresByView,
  selectGifsByView,
} from 'src/app/store/selectors/assets.selectors';

@Component({
  selector: 'app-view-instance',
  templateUrl: './view-instance.component.html',
  styleUrls: ['./view-instance.component.scss'],
})
export class ViewInstanceComponent
  extends ViewBaseComponent
  implements OnInit, OnDestroy
{
  viewImagesSubdir = 'view-instance/';
  viewGifsSubdir = 'view-instance/';

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    document.title = `View-Instance | ${this.appName}`;
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('view-instance'));
    this.viewGifs$ = this.store.select(selectGifsByView('view-instance'));
    this.viewFiguresSub = this.viewFigures$.subscribe(this.viewFiguresObserver);
  }

  ngOnDestroy(): void {
    if (this.viewFiguresSub) {
      this.viewFiguresSub.unsubscribe();
    }
  }
}
