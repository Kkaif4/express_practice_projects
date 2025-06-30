import transport from './nodemailer.js';
import { emailFormat } from './emailFormat.js';
export const sendVerificationEmail = async (email, code) => {
  try {
    const info = await transport.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: emailFormat.replace('CODE_HERE', code),
    });
  } catch (error) {
    return false;
  }
};
