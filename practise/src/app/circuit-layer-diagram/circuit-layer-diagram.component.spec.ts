import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitLayerDiagramComponent } from './circuit-layer-diagram.component';

describe('CircuitLayerDiagramComponent', () => {
  let component: CircuitLayerDiagramComponent;
  let fixture: ComponentFixture<CircuitLayerDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitLayerDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitLayerDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
