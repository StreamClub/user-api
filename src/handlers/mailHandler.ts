
import { config } from '@config';
import { UnableToSendEmailException } from '@exceptions';
import nodemailer from 'nodemailer';
import { MailHandlerI } from './mailHandlerI';

export class MailHandler implements MailHandlerI {
    private transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.senderEmail,
            pass: config.senderPassword
        }
    });

    public sendMail(email: string, verificationCode: number) {
        const mailOptions = {
            from: config.senderEmail,
            to: email,
            subject: 'NO REPLY: Código de Verificación Stream Club',
            text: `Tu código de verificación es: ${verificationCode}`
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw new UnableToSendEmailException(error.message);
            }
        });
    }
}
