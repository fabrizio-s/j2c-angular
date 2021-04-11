/* tslint:disable */
/* eslint-disable */
export interface CreateShippingMethodForm {
  max: number;
  min: number;
  name: string;
  rate: number;
  type: 'Price' | 'Weight';
}
