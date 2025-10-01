import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetailPage } from './brand-detail-page';

describe('BrandDetailPage', () => {
  let component: BrandDetailPage;
  let fixture: ComponentFixture<BrandDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
