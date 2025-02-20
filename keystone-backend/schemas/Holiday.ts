import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, select, timestamp} from "@keystone-6/core/fields";

export const Holiday = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['staff', 'startDate', 'endDate', 'status'],
        },
    },
    fields: {
        startDate: timestamp({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        endDate: timestamp({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        status: select({
            type: 'enum',
            options: [
                { label: 'Open', value: 'open' },
                { label: 'Complete', value: 'complete' },
                { label: 'Approved', value: 'approved' },
                { label: 'Counter Signed', value: 'countersigned' },
            ],
        }),
        staff: relationship({
            ref: 'EventHost.holidays',
            ui: {
                itemView: { fieldMode: 'read' },
            },
        }),
    }
})