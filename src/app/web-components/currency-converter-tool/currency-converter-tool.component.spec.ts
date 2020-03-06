import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterToolComponent } from './currency-converter-tool.component';

describe('CurrencyConverterToolComponent', () => {
  let component: CurrencyConverterToolComponent;
  let fixture: ComponentFixture<CurrencyConverterToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyConverterToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
