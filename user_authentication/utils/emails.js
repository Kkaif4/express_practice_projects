import transport from './nodemailer.js';
import { emailFormat } from './emailFormat.js';
export const sendVerificationEmail = async (email, code) => {
  try {
    const info = await transport.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Verification Code Email',
      html: emailFormat.replace('CODE_HERE', code),
    });
    return info;
  } catch (error) {
    return false;
  }
};
