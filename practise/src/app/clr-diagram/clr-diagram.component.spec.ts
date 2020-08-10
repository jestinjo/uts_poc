import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrDiagramComponent } from './clr-diagram.component';

describe('ClrDiagramComponent', () => {
  let component: ClrDiagramComponent;
  let fixture: ComponentFixture<ClrDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClrDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
