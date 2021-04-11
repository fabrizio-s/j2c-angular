/* tslint:disable */
/* eslint-disable */
export interface UpdateUserForm {
  email?: string;
  enabled?: boolean;
  password?: string;
  role?: 'Admin' | 'Staff' | 'Viewer' | 'Customer';
  verified?: boolean;
}
