/* tslint:disable */
/* eslint-disable */
export interface UseSingleAddressForm {

  /**
   * Save the payment method used during checkout as the default payment method for future purchases
   */
  savePaymentMethodAsDefault?: boolean;

  /**
   * If true, will use the same address for both shipping and billing
   */
  useSingleAddress: boolean;
}
