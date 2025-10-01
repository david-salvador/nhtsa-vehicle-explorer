import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailPage } from './vehicle-detail-page';

describe('VehicleDetailPage', () => {
  let component: VehicleDetailPage;
  let fixture: ComponentFixture<VehicleDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
