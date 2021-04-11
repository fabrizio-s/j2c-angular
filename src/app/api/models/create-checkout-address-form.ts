/* tslint:disable */
/* eslint-disable */
import { CreateAddressForm } from './create-address-form';
export interface CreateCheckoutAddressForm {
  address: CreateAddressForm;

  /**
   * Add the address(es) used during checkout to the user's addresses
   */
  saveCustomerAddresses?: boolean;

  /**
   * Save the payment method used during checkout as the default payment method for future purchases
   */
  savePaymentMethodAsDefault?: boolean;
}
