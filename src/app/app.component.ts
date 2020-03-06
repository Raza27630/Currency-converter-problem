import { Component } from '@angular/core';
import { CurrencyConversionRule } from './interfaces/currency-conversion-rule.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter';
  curr: CurrencyConversionRule = {
    EURO: [{
      target: 'USD',
      rate: 1.2897
    }, {
      target: 'CHF',
      rate: 1.3135
    },{
      target: 'POUND',
      rate: 0.8631
    }],
    USD: [{
      target: 'JPY',
      rate: 109.6200
    }],
    CHF: [{
      target: 'USD',
      rate: 0.9960
    }],
    POUND:[{
      target: 'CAD',
      rate: 1.7574
    }]
  }
}
