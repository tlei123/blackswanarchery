import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ViewBaseComponent } from './../../shared/view-base/view-base.component';
import { AppState } from '@models/app-state.model';
import {
  selectFiguresByView,
  selectGifsByView,
} from '@app/store/selectors/assets.selectors';
import { selectCurrentBreakpoint } from '@app/store/selectors/browser.selectors';

@Component({
  selector: 'app-handles',
  templateUrl: './handles.component.html',
  styleUrls: ['./handles.component.scss'],
})
export class HandlesComponent
  extends ViewBaseComponent
  implements OnInit, OnDestroy
{
  // override ViewBase props
  viewImagesSubdir = 'handles/';
  viewGifsSubdir = 'handles/';

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    document.title = `Handles | ${this.appName}`;
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('handles'));
    this.viewGifs$ = this.store.select(selectGifsByView('handles'));
    this.viewFiguresSub = this.viewFigures$.subscribe(this.viewFiguresObserver);
  }

  ngOnDestroy(): void {
    if (this.viewFiguresSub) {
      this.viewFiguresSub.unsubscribe();
    }
  }
}
