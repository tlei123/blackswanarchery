import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import * as figsActions from './../actions/figures.actions';
import { FiguresEffects } from './figures.effects';
import { FiguresService } from './../../services/figures.service';
import { FiguresState } from './../../models/figures-state.model';
import * as figuresJson from './../../../data/figures.json';
import { initialState } from './../reducers/figures.reducer';

describe('FiguresEffects', () => {
  let actions$: Observable<any>;
  let effects: FiguresEffects;
  let store: MockStore<FiguresState>;
  let figuresSvc: FiguresService;

  class MockFiguresService {
    getFigures() {
      return of(figuresJson);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FiguresEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: FiguresService, useClass: MockFiguresService },
      ],
    });

    effects = TestBed.inject(FiguresEffects);
    store = TestBed.inject(MockStore);
    figuresSvc = TestBed.inject(FiguresService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('calls service and dispatches success action', (done) => {
    const spy = spyOn(figuresSvc, 'getFigures').and.callThrough();
    actions$ = of(figsActions.loadFigures);

    effects.loadFigures$.subscribe((res) => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(res).toEqual(
        figsActions.loadFiguresSuccess({ figures: figuresJson }),
      );
      done();
    });
  });
});
