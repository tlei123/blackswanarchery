import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { appConfig } from './../../app.config';
import { AppState } from 'src/app/models/app-state.model';
import { Figure } from 'src/app/models/figure.model';
import { Store } from '@ngrx/store';
import { selectCurrentBreakpoint } from 'src/app/store/selectors/browser.selectors';
import { selectZoomBreakpoints } from '../../store/selectors/zoom.selectors';

@Component({
  selector: 'app-smart-figure',
  templateUrl: './smart-figure.component.html',
  styleUrls: ['./smart-figure.component.scss'],
})
export class SmartFigureComponent implements OnInit, OnDestroy {
  @Input() viewImagesSubdir: string;
  @Input() figure: Figure;
  @Input() index?: number; // required IF SmartFigure's being iterated
  // imageDimension examples [for Desktop media-breakpoints]:
  // 'w150' => 'height: auto; width: 150px'
  // 'h200' => 'height: 200px; width: auto'
  @Input() imageDimension: string | string[];
  @Input() hideCaption: boolean | boolean[];

  @ViewChild('image', { static: false }) imageElement: ElementRef;

  @Output() zoom = new EventEmitter<Figure>();

  appImagesDir = appConfig.dirs.images;
  currentBreakpoint$: Observable<string>;
  currentBreakpointSub: Subscription;
  zoomBreakpoints$: Observable<string[]>;
  figureStyle = '';
  imageStyle = '';

  currentBreakpointObserver = {
    next: (x: string) => {
      setTimeout(() => {
        this.imageElement.nativeElement.dispatchEvent(new Event('load'));
      }, 100);
    },
    error: (err: Error) => {
      console.error('[App.currentBreakpointObserver] Got an error:', err);
    },
    complete: () => {},
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentBreakpoint$ = this.store.select(selectCurrentBreakpoint());
    this.zoomBreakpoints$ = this.store.select(selectZoomBreakpoints());
    this.currentBreakpointSub = this.currentBreakpoint$.subscribe(
      this.currentBreakpointObserver,
    );
  }

  ngOnDestroy(): void {
    if (this.currentBreakpointSub) {
      this.currentBreakpointSub.unsubscribe();
    }
  }

  isZoomEnabled(
    figure: Figure,
    zoomBreakpoints: string[],
    currentBreakpoint: string,
  ): boolean {
    return figure.zoomable && zoomBreakpoints.includes(currentBreakpoint);
  }

  setStyles(
    $event,
    zoomBreakpoints: string[],
    currentBreakpoint: string,
  ): void {
    const img = $event.target;
    const intrinsicWidth = parseFloat(img.width);
    const intrinsicHeight = parseFloat(img.height);
    const aspectRatio = intrinsicWidth / intrinsicHeight;
    const isMobile = !zoomBreakpoints.includes(currentBreakpoint);

    this.setImageStyle(isMobile, aspectRatio);
    this.setFigureStyle(isMobile, aspectRatio);
  }

  setImageStyle(isMobile: boolean, aspectRatio: number): void {
    const imgDim = Array.isArray(this.imageDimension)
      ? this.imageDimension[this.index]
      : this.imageDimension;
    const dim = imgDim.slice(0, 1);
    const length = parseFloat(imgDim.slice(1));

    this.imageStyle = '';
    if (isMobile) {
      this.imageStyle = 'height:auto; width:100%;';
    } else {
      this.imageStyle =
        dim === 'w'
          ? `height:auto; width:${length}px;`
          : `height:${length}px; width:auto;`;
    }
  }

  setFigureStyle(isMobile: boolean, imageAspectRatio: number) {
    const imgDimStr = Array.isArray(this.imageDimension)
      ? this.imageDimension[this.index]
      : this.imageDimension;
    const dim = imgDimStr.slice(0, 1);
    const length = parseFloat(imgDimStr.slice(1));

    this.figureStyle = '';
    if (!isMobile) {
      this.figureStyle =
        dim === 'w'
          ? `width:${length}px;`
          : `width:${length * imageAspectRatio}px;`;
    }
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
