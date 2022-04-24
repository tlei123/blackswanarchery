import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomComponent } from './zoom.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ZoomComponent', () => {
  let component: ZoomComponent;
  let fixture: ComponentFixture<ZoomComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ZoomComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
