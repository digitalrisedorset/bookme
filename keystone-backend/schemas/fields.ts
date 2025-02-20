import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  isEventHost: checkbox({
    defaultValue: false,
    label: 'EventHost can book appointment on behalf of customers',
  }),
  isCustomer: checkbox({
    defaultValue: false,
    label: 'Default user are customers',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
