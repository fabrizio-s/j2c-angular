import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatter implements PipeTransform {

  transform(monetaryAmount: number | undefined, currency: string | undefined): string {
    if (!monetaryAmount) {
      return '';
    }
    // works for USD and EUR
    return (monetaryAmount / 100).toLocaleString("en-US", { style:"currency", currency });
  }

}
