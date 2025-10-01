import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModelList } from './vehicle-model-list';

describe('VehicleModelList', () => {
  let component: VehicleModelList;
  let fixture: ComponentFixture<VehicleModelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleModelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleModelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
