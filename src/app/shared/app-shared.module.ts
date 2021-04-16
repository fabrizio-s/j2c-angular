import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyFormatter } from './pipes/currency-formatter.pipe';

@NgModule({
  declarations: [
    CurrencyFormatter
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    CurrencyFormatter,
    NgxSpinnerModule
  ]
})
export class AppSharedModule { }
