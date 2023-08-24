import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepreserveModalComponent } from './stepreserve-modal.component';

describe('StepreserveModalComponent', () => {
  let component: StepreserveModalComponent;
  let fixture: ComponentFixture<StepreserveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepreserveModalComponent]
    });
    fixture = TestBed.createComponent(StepreserveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
