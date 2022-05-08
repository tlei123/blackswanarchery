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
  @Input() index?: number; // required IF SmartFigure's being iterated
  // imageDimension examples:
  // 'w150' => 'height: auto; width: 150px'
  // 'h200' => 'height: 200px; width: auto'
  @Input() imageDimension: string | string[];
  @Input() hideCaption: boolean | boolean[];

  @Output() zoom = new EventEmitter<Figure>();

  appImagesDir = appConfig.dirs.images;
  currentBreakpoint$: Observable<string>;
  zoomState$: Observable<object>;
  figureStyle = '';
  imageStyle = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.zoomState$ = this.store.select('zoom');
  }

  isZoomEnabled(
    figure: Figure,
    zoomBreakpoints: string[],
    currentBreakpoint: string,
  ): boolean {
    return figure.zoomable && zoomBreakpoints.includes(currentBreakpoint);
  }

  setStyles($event): void {
    const img = $event.target;
    const width = parseFloat(img.width);
    const height = parseFloat(img.height);
    const aspectRatio = width / height;

    this.setImageStyle(aspectRatio);
    this.setFigureStyle(aspectRatio);
  }

  setImageStyle(aspectRatio: number): void {
    const imgDim = Array.isArray(this.imageDimension)
      ? this.imageDimension[this.index]
      : this.imageDimension;
    const dim = imgDim.slice(0, 1);
    const length = parseFloat(imgDim.slice(1));

    this.imageStyle =
      dim === 'w'
        ? `height:auto;width:${length}px;`
        : `height:${length}px;width:auto;`;
  }

  setFigureStyle(imageAspectRatio: number) {
    const imgDimStr = Array.isArray(this.imageDimension)
      ? this.imageDimension[this.index]
      : this.imageDimension;
    const dim = imgDimStr.slice(0, 1);
    const length = parseFloat(imgDimStr.slice(1));

    this.figureStyle =
      dim === 'w'
        ? `width:${length}px;`
        : `width:${length * imageAspectRatio}px;`;
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
