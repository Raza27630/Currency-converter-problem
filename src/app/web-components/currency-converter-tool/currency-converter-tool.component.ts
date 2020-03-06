import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CurrencyConversionRule } from 'src/app/interfaces/currency-conversion-rule.interface';
import { CurrencyCalculation } from 'src/app/classes/currency-calculation.model';
import { Subject, Observable } from 'rxjs';
import { debounceTime, map, } from 'rxjs/operators'
import { ThemeSelectorService } from 'src/app/injectables/theme-selector.service';

@Component({
  selector: 'app-currency-converter-tool',
  templateUrl: './currency-converter-tool.component.html',
  styleUrls: ['./currency-converter-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CurrencyConverterToolComponent {
  // class:: which is responsible for all conversion related stuff
  calculationModel: CurrencyCalculation;

  // Base currencies holder
  private _baseCurrencies$ = new Subject<string[]>();

  // Target currencies and their rate holder
  private _targetCurrencies$ = new Subject<{ target: string, rate: number }[]>();

  // to hold stream of input numbers
  amount$ = new Subject<number>();

  // calulated sum based on user input
  sum$: Observable<number>;

  // provided currencies as part of configuation
  private _currencyRules: CurrencyConversionRule;

  baseCurrencies$ = this._baseCurrencies$.asObservable();

  targetCurrencies$ = this._targetCurrencies$.asObservable();

  // Element reference of amount input element
  @ViewChild('amountInput', { static: false }) inputEle: ElementRef<HTMLInputElement>;
  
  // exposed property of component to outside world to get currencies from them
  @Input() set currencySet(currencies: CurrencyConversionRule) {
    this._currencyRules = currencies;
    this._baseCurrencies$.next(Object.keys(currencies));
  };
  
  // Theme selector
  theme$: Observable<boolean>;
  constructor(private readonly themeService: ThemeSelectorService) {
    // calculation model initialized
    this.calculationModel = new CurrencyCalculation(null, null, 0);
    // bind calculated sum to observable
    this.sum$ = this.amount$.pipe(debounceTime(300), map(amount => {
      this.calculationModel.calculateAmount(amount);
      return this.calculationModel.calculatedAmount;
    }));
    // bind seleccted theme to observable
    this.theme$ = this.themeService.theme$;
  }
  onBaseCurrencyChange(baseCurrency: string) {
    this.calculationModel.base = baseCurrency;
    this._targetCurrencies$.next(this._currencyRules[baseCurrency]);
    this.resetCalculationModel();
  }
  onTargetCurrencyChange(targetCurrency: string, base: string) {
    const targetCurrencies = this.getTargetCurrencies(base);
    const index = targetCurrencies.findIndex(e => e.target === targetCurrency);
    if (index === -1) {
      return;
    }
    this.calculationModel.target = targetCurrencies[index].target;
    this.calculationModel.rate = targetCurrencies[index].rate;
    this.recalculateSum();
  }
  getTargetCurrencies = (base: string) => this._currencyRules[base];
  recalculateSum() {
    if (this.calculationModel.target && this.calculationModel.amount) {
      this.amount$.next(this.calculationModel.amount);
    }
  }
  resetCalculationModel() {
    this.calculationModel.target = null;
    this.calculationModel.rate = 0;
    this.amount$.next(0);
    this.inputEle.nativeElement.value = '';
  }
}
