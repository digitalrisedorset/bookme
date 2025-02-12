import { getTestMessageUrl } from 'nodemailer';
import {awsTransporter} from "./awsmail";
import {keystoneconfig} from "../config";

function makeANiceEmail(text: string) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hi,</h2>
      <p>${text}</p>

      <p>Herve</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: (string)[] | null;
  rejected?: (null)[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: (string)[] | null;
}


export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = (await awsTransporter.sendMail({
    to,
    from: "herve@digitalrisedorset.co.uk",
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${keystoneconfig.frontend.host}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })) as MailResponse;

  if(process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}
