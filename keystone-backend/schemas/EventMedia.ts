import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'sickfits',
};

export const EventMedia = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'eventHost', 'day', 'startTime', 'endTime', 'status'],
        },
    },
    fields: {
        title: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        image: cloudinaryImage({
            cloudinary,
            label: 'Source',
        }),
        altText: text(),
        event: relationship({ ref: 'Event.pictures' }),
    }
})