import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTalksPlainComponent } from './map-talks-plain.component';

describe('MapTalksPlainComponent', () => {
  let component: MapTalksPlainComponent;
  let fixture: ComponentFixture<MapTalksPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTalksPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTalksPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
