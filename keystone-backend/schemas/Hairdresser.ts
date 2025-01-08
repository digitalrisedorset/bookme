import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import {isAdmin, isAdminOrSameUser} from "./User";

export const Hairdresser = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'level', 'haircutTypes'],
        },
    },
    fields: {
        name: text({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
            isFilterable: true,
            isOrderable: false
        }),
        level: text({
            isFilterable: true,
            validation: {
                isRequired: true,
            },
        }),
        haircutTypeDurations: relationship({
            ref: 'HaircutTypeDuration.hairdresser',
            many: true,
        }),
        haircutTypes: relationship({
            ref: 'HaircutType.hairdresser',
            many: true,
        }),
        event: relationship({
            ref: 'Event.hairdresser',
            many: true,
        }),
        holidays: relationship({
            ref: 'Holiday.staff',
            many: true,
        }),
        user: relationship({ ref: 'User.hairdresser' })
    }
})