import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { ViewBaseComponent } from '@app/shared/view-base/view-base.component';
import { AppState } from '@app/models/app-state.model';
import { selectCurrentBreakpoint } from '@app/store/selectors/browser.selectors';
import {
  selectFiguresByView,
  selectGifsByView,
} from '@app/store/selectors/assets.selectors';

@Component({
  selector: 'app-limbs',
  templateUrl: './limbs.component.html',
  styleUrls: ['./limbs.component.scss'],
})
export class LimbsComponent
  extends ViewBaseComponent
  implements OnInit, OnDestroy
{
  viewImagesSubdir = 'limbs/';
  viewGifsSubdir = 'limbs/';

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    document.title = `Bow Limbs | ${this.appName}`;
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('limbs'));
    this.viewGifs$ = this.store.select(selectGifsByView('limbs'));
    this.viewFiguresSub = this.viewFigures$.subscribe(this.viewFiguresObserver);
  }

  ngOnDestroy(): void {
    if (this.viewFiguresSub) {
      this.viewFiguresSub.unsubscribe();
    }
  }
}
