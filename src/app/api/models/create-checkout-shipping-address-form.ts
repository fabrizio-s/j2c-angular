/* tslint:disable */
/* eslint-disable */
import { CreateAddressForm } from './create-address-form';
export interface CreateCheckoutShippingAddressForm {
  address: CreateAddressForm;

  /**
   * Add the address(es) used during checkout to the user's addresses
   */
  saveCustomerAddresses?: boolean;
}
