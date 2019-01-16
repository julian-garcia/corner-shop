import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOutcomeComponent } from './order-outcome.component';

describe('OrderOutcomeComponent', () => {
  let component: OrderOutcomeComponent;
  let fixture: ComponentFixture<OrderOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
