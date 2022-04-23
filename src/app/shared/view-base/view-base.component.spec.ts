import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ViewBaseComponent } from './view-base.component';
import { mockInitialAppState as initialState } from './../../testing/mocks/mock-app-state';

describe('ViewBaseComponent', () => {
  let component: ViewBaseComponent;
  let fixture: ComponentFixture<ViewBaseComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ViewBaseComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBaseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    component.appGifsDir = '/assets/gifs/';
    component.appImagesDir = '/assets/images/';
    component.appName = 'Black Swan Archery';
    component.appVideosDir = '/assets/videos/';
    component.viewImagesSubdir = 'view-base/';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select state-slices', async () => {
    const selectSpy = spyOn(store, 'select');

    component.ngOnInit();

    expect(selectSpy).toHaveBeenCalledTimes(2);
  });
});
