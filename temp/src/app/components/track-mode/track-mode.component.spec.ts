import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackModeComponent } from './track-mode.component';

describe('TrackModeComponent', () => {
  let component: TrackModeComponent;
  let fixture: ComponentFixture<TrackModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
