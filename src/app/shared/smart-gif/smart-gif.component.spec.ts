import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGifComponent } from './smart-gif.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SmartGifComponent', () => {
  let component: SmartGifComponent;
  let fixture: ComponentFixture<SmartGifComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SmartGifComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGifComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
