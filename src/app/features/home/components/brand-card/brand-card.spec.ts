import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCard } from './brand-card';

describe('BrandCard', () => {
  let component: BrandCard;
  let fixture: ComponentFixture<BrandCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
