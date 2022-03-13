import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '@shared/container/providers/dtos/ISendMailDTO';
import IMailProvider from '../interfaces/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transport = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.transporter = transport;
    });
  }

  public async sendMailProvider({
    to,
    subject,
    text,
  }: ISendMailDTO): Promise<void> {
    const info = await this.transporter.sendMail({ to, subject, text });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EtherealMailProvider;
