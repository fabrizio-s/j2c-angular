/* tslint:disable */
/* eslint-disable */
import { UpdateAddressForm } from './update-address-form';
export interface UpdateCheckoutShippingAddressForm {
  address?: UpdateAddressForm;

  /**
   * Add the address(es) used during checkout to the user's addresses
   */
  saveCustomerAddresses?: boolean;
}
