import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrGraphComponent } from './clr-graph.component';

describe('ClrGraphComponent', () => {
  let component: ClrGraphComponent;
  let fixture: ComponentFixture<ClrGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClrGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
