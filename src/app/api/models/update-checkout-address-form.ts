/* tslint:disable */
/* eslint-disable */
import { UpdateAddressForm } from './update-address-form';
export interface UpdateCheckoutAddressForm {
  address?: UpdateAddressForm;

  /**
   * Add the address(es) used during checkout to the user's addresses
   */
  saveCustomerAddresses?: boolean;

  /**
   * Save the payment method used during checkout as the default payment method for future purchases
   */
  savePaymentMethodAsDefault?: boolean;
}
