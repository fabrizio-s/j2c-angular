/* tslint:disable */
/* eslint-disable */
export interface CreateUserForm {
  email?: string;
  enabled?: boolean;
  password?: string;
  role: 'Admin' | 'Staff' | 'Viewer' | 'Customer';
  verified?: boolean;
}
