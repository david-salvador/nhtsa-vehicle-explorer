import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSearch } from './brand-search';

describe('BrandSearch', () => {
  let component: BrandSearch;
  let fixture: ComponentFixture<BrandSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
