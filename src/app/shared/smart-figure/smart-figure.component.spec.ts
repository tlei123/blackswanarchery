import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFigureComponent } from './smart-figure.component';

describe('SmartFigureComponent', () => {
  let component: SmartFigureComponent;
  let fixture: ComponentFixture<SmartFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
