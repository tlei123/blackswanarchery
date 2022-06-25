import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

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
  // ViewBase prop-overrides
  viewImagesSubdir = 'handles/';
  viewGifsSubdir = 'handles/';

  // local props
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  carouselOpts = {
    interval: 6075,
    paused: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnIndicator: false,
    unpauseOnArrow: false,
  };
  carouselItems = [
    {
      title: 'Handle A',
      description: '[16"-size shown here]',
      gifSrc: 'handles-01.gif',
    },
    {
      title: 'Handle B',
      description: '[14"-size shown here]',
      gifSrc: 'handles-02.gif',
    },
    {
      title: 'Handle C',
      description: '[16"-size shown here]',
      gifSrc: 'handles-03.gif',
    },
    {
      title: 'Handle C',
      description: '[14"-size shown here]',
      gifSrc: 'handles-04.gif',
    },
    {
      title: 'Handle E',
      description: '[16"-size shown here]',
      gifSrc: 'handles-05.gif',
    },
  ];

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    document.title = `Handle System | ${this.appName}`;
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

  toggleCarouselPaused(): void {
    if (this.carouselOpts.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }

    this.carouselOpts.paused = !this.carouselOpts.paused;
  }

  onCarouselSlide(slideEvent: NgbSlideEvent): void {
    if (
      this.carouselOpts.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.toggleCarouselPaused();
    }
    if (
      this.carouselOpts.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.toggleCarouselPaused();
    }
  }
}
