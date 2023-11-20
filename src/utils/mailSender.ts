import { config } from '@config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.senderEmail,
        pass: config.senderPassword
    }
});

export function sendMail(email: string, verificationCode: number) {
    const mailOptions = {
        from: config.senderEmail,
        to: email,
        subject: 'NO REPLY: Codigo de Verificacion Stream Club',
        text: `Tu codigo de verificacion es: ${verificationCode}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
