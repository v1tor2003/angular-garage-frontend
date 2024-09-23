import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeleteModalComponent } from './car-delete-modal.component';

describe('CarDeleteModalComponent', () => {
  let component: CarDeleteModalComponent;
  let fixture: ComponentFixture<CarDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
