import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimsComponent } from './trims.component';

describe('TrimsComponent', () => {
  let component: TrimsComponent;
  let fixture: ComponentFixture<TrimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
