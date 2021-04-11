/* tslint:disable */
/* eslint-disable */
import { Line } from './line';
export interface CreateCheckoutForm {
  email: string;

  /**
   * A line id here represents a product variant id, and the quantity is how many of those variants the customer wishes to purchase
   */
  lines: Array<Line>;
}
