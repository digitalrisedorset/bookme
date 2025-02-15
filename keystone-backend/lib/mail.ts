import {awsTransporter} from "./awsmail";
import {getTestMessageUrl} from "nodemailer";
import {MailResponse} from "./mail/resetpassword";

export function makeANiceEmail(text: string) {
    return `
    <div style="
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

export const sendEmail = async (to: string, subject: string, message: string) => {
    const info = (await awsTransporter.sendMail({
        to,
        from: "herve@digitalrisedorset.co.uk",
        subject,
        html: makeANiceEmail(message),
    })) as MailResponse;

    if(process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

    }
}