/* tslint:disable */
/* eslint-disable */
export interface ShippingMethodDto {
  id?: number;
  max?: number;
  min?: number;
  name?: string;
  rate?: number;
  type?: 'Price' | 'Weight';
  zoneId?: number;
}
