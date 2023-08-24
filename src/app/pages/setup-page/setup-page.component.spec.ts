import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPageComponent } from './setup-page.component';

describe('SetupPageComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupPageComponent]
    });
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
