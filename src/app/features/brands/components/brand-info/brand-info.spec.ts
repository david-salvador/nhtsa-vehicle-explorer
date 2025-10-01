import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandInfo } from './brand-info';

describe('BrandInfo', () => {
  let component: BrandInfo;
  let fixture: ComponentFixture<BrandInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
