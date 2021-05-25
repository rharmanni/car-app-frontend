import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimComponent } from './trim.component';

describe('TrimComponent', () => {
  let component: TrimComponent;
  let fixture: ComponentFixture<TrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
