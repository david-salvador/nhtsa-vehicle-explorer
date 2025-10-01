import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFilter } from './vehicle-filter';

describe('VehicleFilter', () => {
  let component: VehicleFilter;
  let fixture: ComponentFixture<VehicleFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
