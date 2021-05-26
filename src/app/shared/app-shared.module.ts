import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyFormatter } from './pipes/currency-formatter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CurrencyFormatter
  ],
  exports: [
    CurrencyFormatter,
    FlexLayoutModule,
    NgxSpinnerModule,
  ]
})
export class AppSharedModule { }
