import { getCurrentBreakpoint } from './../../utils/get-current-breakpoint';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { appConfig } from './../../app.config';
import { AppState } from 'src/app/models/app-state.model';
import { Figure } from 'src/app/models/figure.model';
import { Store } from '@ngrx/store';
import { selectCurrentBreakpoint } from 'src/app/store/selectors/browser.selectors';

@Component({
  selector: 'app-smart-figure',
  templateUrl: './smart-figure.component.html',
  styleUrls: ['./smart-figure.component.scss'],
})
export class SmartFigureComponent implements OnInit {
  @Input() viewImagesSubdir: string;
  @Input() figure: Figure;
  @Input() imageWidth?: string;
  @Input() imageHeight?: string;
  @Input() hideCaption: boolean = false;

  @Output() zoom = new EventEmitter<Figure>();

  appImagesDir = appConfig.dirs.images;
  currentBreakpoint$: Observable<string>;
  zoomState$: Observable<object>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.zoomState$ = this.store.select('zoom');
  }

  getImageStyle(): string {
    if (this.imageWidth) {
      return `height:auto;width:${this.imageWidth};`;
    }

    if (this.imageHeight) {
      return `height:${this.imageHeight};width:auto;`;
    }

    return 'height:auto;width:auto;';
  }

  getCaptionStyle(): string {
    if (this.imageWidth) {
      return `width:${this.imageWidth};`;
    }

    return 'width:auto;';
  }

  isZoomEnabled(
    figure: Figure,
    zoomBreakpoints: string[],
    currentBreakpoint: string,
  ): boolean {
    return figure.zoomable && zoomBreakpoints.includes(currentBreakpoint);
  }

  onImageClick(
    figure: Figure,
    zoomBreakpoints: string[],
    currentBreakpoint: string,
  ): void {
    if (this.isZoomEnabled(figure, zoomBreakpoints, currentBreakpoint)) {
      this.zoom.emit(figure);
    } else {
      console.info(
        `[SmartFigure.onImageClick] Image ${figure.imageFilename} is NOT zoomable.  Current breakpoint: ${currentBreakpoint}`,
      );
    }
  }
}
