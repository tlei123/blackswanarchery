import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { AppState } from './../../models/app-state.model';
import { BrowserState } from 'src/app/models/browser-state.model';
import { selectFiguresByView } from 'src/app/store/selectors/figures.selectors';

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

  currentBreakpoint: string;
  browserStateSub: Subscription;
  viewFigures$: Observable<object>;
  viewImagesSubdir = 'view-base/';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // copy to instance-component [life-cycle methods are not inherited]
    this.browserStateSub = this.store
      .select('browser')
      .subscribe((bState: BrowserState) => {
        this.currentBreakpoint = bState.currentBreakpoint;
      });
    this.viewFigures$ = this.store.select(selectFiguresByView('view-base'));
    document.title = `View-Base | ${this.appName}`;
  }
}
