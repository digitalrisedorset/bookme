import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import {permissionFields} from "./fields";

export const Role = list({
    access: allowAll,
    fields: {
        name: text({isRequired: true}),
        ...permissionFields,
        assignedTo: relationship({
            ref: 'User.role',
            many: true,
            ui: {
                itemView: { fieldMode: 'read' },
            },
        })
    }
})