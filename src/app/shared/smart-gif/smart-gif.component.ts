import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { appConfig } from '@app/app.config';
import { AppState } from '@models/app-state.model';
import { BrowserState } from '@models/browser-state.model';
import { selectBrowserState } from '@store/selectors/browser.selectors';
import { isMobile, getImageAspectRatio } from '@utils/index';
import { Gif } from '@models/gif.model';

@Component({
  selector: 'app-smart-gif',
  templateUrl: './smart-gif.component.html',
  styleUrls: ['./smart-gif.component.scss'],
})
export class SmartGifComponent implements OnInit, OnDestroy {
  @Input() viewGifsSubdir: string;
  @Input() gif: Gif;
  @Input() index?: number; // required IF SmartGif's being iterated
  @Input() desktopImageHeight?: string;
  @Input() hoverMessagePaused? =
    'Click Play button at bottom-left corner to start';
  @Input() hoverMessagePlaying? =
    'Click Stop button at bottom-left corner to stop';

  @ViewChild('image', { static: false }) imageElement: ElementRef;

  appGifsDir = appConfig.dirs.gifs;
  currentBreakpoint = '';
  browserState$: Observable<object>;
  browserStateSub: Subscription;
  wrapperStyle: string | any = 'height:auto;width:100%;';

  constructor(private store: Store<AppState>) {}

  currentBreakpointObserver = {
    next: (browserState: BrowserState) => {
      this.currentBreakpoint = browserState.currentBreakpoint;
      setTimeout(() => {
        // re-dispatch image-load event to re-trigger setStyles()
        this.imageElement.nativeElement.dispatchEvent(new Event('load'));
      }, 100);
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

  setStyles($event, currBrkpt: string): void {
    this.wrapperStyle = this.getResponsiveWrapperStyle(
      currBrkpt,
      $event.target,
    );
    // this.imageStyle = this.getResponsiveImgStyle(currBrkpt);
  }

  getResponsiveWrapperStyle(currBrkpt: string, img: HTMLImageElement): string {
    let style = 'height:auto;width:100%;';

    if (!isMobile(currBrkpt) && this.desktopImageHeight) {
      const imgHeight = Array.isArray(this.desktopImageHeight)
        ? this.desktopImageHeight[this.index]
        : this.desktopImageHeight;

      style = `height:auto;width:${
        getImageAspectRatio(img) * parseInt(imgHeight)
      }px;`;
    }

    console.info(`[SmartGif.getResponsiveWrapperStyle] style: ${style}`);

    return style;
  }

  getResponsiveImgStyle(currBrkpt: string): string {
    let style = '';

    if (isMobile(currBrkpt)) {
      style = 'height:auto;width:100%;';
    } else if (this.desktopImageHeight) {
      const imgHeight = Array.isArray(this.desktopImageHeight)
        ? this.desktopImageHeight[this.index]
        : this.desktopImageHeight;
      style = `height:${imgHeight};width:auto;`;
    } else {
      style = 'height:auto;width:auto;';
    }

    return style;
  }
}
