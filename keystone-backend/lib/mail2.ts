import {SendEmailCommand, SESClient} from "@aws-sdk/client-ses";
import {keystoneconfig} from "../config";

const client = new SESClient({
  region : keystoneconfig.aws.region,
  profile: 'default',
  version: '2010-12-01',
  credentials: {
    accessKeyId : keystoneconfig.aws.accessId,
    secretAccessKey : keystoneconfig.aws.secretAccess
  }
});


function makeANiceEmail(text: string) {
  return 'test enau'
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hi, you have requested a password reset, please find a reset link below</h2>
      <p>${text}</p>

      <p>Herve</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  console.log(`💌 passwordResetLink 11`, {
    resetToken,
    to
  });

  try {
    const params = {
      Source: 'herve@digitalrisedorset.co.uk',
      Destination: {
        ToAddresses: [
          to
        ]
      },
      Message: {
        Subject: {
          Data: 'Your password reset token!'
        },
        Body: {
          Text: {
            Data: makeANiceEmail(`Your Password Reset Token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>`),
          }
        }
      }
    }

    const command = new SendEmailCommand(params);
    const sesResult = await client.send(command);
    console.log('💌 Message Sent!', sesResult);
    // email the user a token
  } catch (err) {
    console.log('Error', err);
  }
}
