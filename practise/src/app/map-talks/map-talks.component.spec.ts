import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTalksComponent } from './map-talks.component';

describe('MapTalksComponent', () => {
  let component: MapTalksComponent;
  let fixture: ComponentFixture<MapTalksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTalksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
