import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeList } from './vehicle-type-list';

describe('VehicleTypeList', () => {
  let component: VehicleTypeList;
  let fixture: ComponentFixture<VehicleTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
