import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStatistics } from './brand-statistics';

describe('BrandStatistics', () => {
  let component: BrandStatistics;
  let fixture: ComponentFixture<BrandStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandStatistics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
