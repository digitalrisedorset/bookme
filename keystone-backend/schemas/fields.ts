import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  isHairdresser: checkbox({
    defaultValue: false,
    label: 'Hairdresser can book appointment on behalf of customers',
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
