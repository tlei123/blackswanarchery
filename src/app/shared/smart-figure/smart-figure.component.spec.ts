import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

import { SmartFigureComponent } from './smart-figure.component';
import { mockInitialAppState as initialState } from './../../testing/mocks/mock-app-state';

describe('SmartFigureComponent', () => {
  let component: SmartFigureComponent;
  let fixture: ComponentFixture<SmartFigureComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [SmartFigureComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFigureComponent);
    component = fixture.componentInstance;
    component.figure;
    component.viewImagesSubdir;
    component.figure;
    component.imageWidth;
    component.imageHeight;
    component.hideCaption;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Flesh out other tests.
});
