import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePageComponent } from './reserve-page.component';

describe('ReservePageComponent', () => {
  let component: ReservePageComponent;
  let fixture: ComponentFixture<ReservePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservePageComponent]
    });
    fixture = TestBed.createComponent(ReservePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
