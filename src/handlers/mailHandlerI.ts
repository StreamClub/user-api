

export interface MailHandlerI {
    sendMail(email: string, verificationCode: number): void;
}
