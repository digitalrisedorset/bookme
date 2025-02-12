import * as nodemailer from "nodemailer";
import ses from 'nodemailer-ses-transport';
import {keystoneconfig} from "../config";

export const awsTransporter = nodemailer.createTransport(ses({
    accessKeyId: keystoneconfig.aws.accessId,
    secretAccessKey: keystoneconfig.aws.secretAccess,
    region: 'eu-west-2',
}));
