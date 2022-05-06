import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adpter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "923b0d18eb595d",
    pass: "3ec3541d655966",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "equipe feedget <Elias@123.com.br>",
      to: "Elias Oliveira <eliascpr123@gmail.com",
      subject,
      html: body,
    });
  }
}
