import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstanceComponent } from './view-instance.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ViewInstanceComponent', () => {
  let component: ViewInstanceComponent;
  let fixture: ComponentFixture<ViewInstanceComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ViewInstanceComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstanceComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
