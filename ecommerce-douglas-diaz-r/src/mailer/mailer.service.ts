import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.development.env' });

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'comicraft2024',
      to,
      subject,
      text,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
