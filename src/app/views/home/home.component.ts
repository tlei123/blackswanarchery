import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ViewBaseComponent } from '@shared/view-base/view-base.component';
import { AppState } from '@models/app-state.model';
import { selectCurrentBreakpoint } from '@app/store/selectors/browser.selectors';
import {
  selectFiguresByView,
  selectGifsByView,
} from '@app/store/selectors/assets.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends ViewBaseComponent
  implements OnInit, OnDestroy
{
  viewImagesSubdir = 'home/';
  viewGifsSubdir = 'home/';

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    document.title = `Home | ${this.appName}`;
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.viewFigures$ = this.store.select(selectFiguresByView('home'));
    this.viewGifs$ = this.store.select(selectGifsByView('home'));
    this.viewFiguresSub = this.viewFigures$.subscribe(this.viewFiguresObserver);
  }

  ngOnDestroy(): void {
    if (this.viewFiguresSub) {
      this.viewFiguresSub.unsubscribe();
    }
  }
}
