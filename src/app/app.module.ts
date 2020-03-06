import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrencyConverterToolComponent } from './web-components/currency-converter-tool/currency-converter-tool.component';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import { UtilityComponent } from './presentation-components/utility/utility.component'
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterToolComponent,
    UtilityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CurrencyConverterToolComponent, AppComponent]
})
export class AppModule {
  constructor(private readonly injector: Injector,
    private readonly translateService: TranslateService) {
    // Available language translations 
    this.translateService.addLangs(['en', 'de', 'fr']);
    // fallback language 
    this.translateService.setDefaultLang('en');
    // Set initial language for app
    this.translateService.use('en');
  }
  // Place to declare components as web-components
  ngDoBootstrap() {
    const el = createCustomElement(CurrencyConverterToolComponent, { injector: this.injector });
    customElements.define('currency-converter', el);
    const elRoot = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-root', elRoot);
  }
}
