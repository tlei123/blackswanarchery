import { selectBrowserState } from './../../store/selectors/browser.selectors';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/models/app-state.model';
import { BrowserState } from './../../models/browser-state.model';
import { isMobile } from 'src/app/utils';

@Component({
  selector: 'app-smart-gif',
  templateUrl: './smart-gif.component.html',
  styleUrls: ['./smart-gif.component.scss'],
})
export class SmartGifComponent implements OnInit, OnDestroy {
  @Input() gifSrc: string;
  @Input() thumbnailSrc: string;
  @Input() desktopImageHeight?: string;
  @Input() hoverMessagePaused? =
    'Click Play button at bottom-left corner to start';
  @Input() hoverMessagePlaying? =
    'Click Stop button at bottom-left corner to stop';

  currentBreakpoint = '';
  browserState$: Observable<object>;
  browserStateSub: Subscription;
  imageStyle: string | any = 'height:auto;width:auto;';

  constructor(private store: Store<AppState>) {}

  currentBreakpointObserver = {
    next: (browserState: BrowserState) => {
      this.currentBreakpoint = browserState.currentBreakpoint;
      this.imageStyle = this.getResponsiveImgStyle(
        browserState.currentBreakpoint,
      );
    },
    error: (err: Error) => {
      console.error('[SmartGif.currentBreakpointObserver] Got an error:', err);
    },
    complete: () => {},
  };

  ngOnInit(): void {
    this.browserState$ = this.store.select(selectBrowserState);
    this.browserStateSub = this.browserState$.subscribe(
      this.currentBreakpointObserver,
    );
  }

  ngOnDestroy(): void {
    if (this.browserStateSub) {
      this.browserStateSub.unsubscribe();
    }
  }

  getResponsiveImgStyle(currBrkpt: string): string {
    let style = '';

    if (isMobile(currBrkpt)) {
      style = 'height:auto;width:100%;';
    } else if (this.desktopImageHeight) {
      style = `height:${this.desktopImageHeight};width:auto;`;
    } else {
      style = 'height:auto;width:auto;';
    }

    return style;
  }
}
