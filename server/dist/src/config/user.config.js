"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPasswordConfig = exports.verifyEmailConfig = void 0;
exports.verifyEmailConfig = {
    EMAIL_SECRET: process.env.EMAIL_SECRET || 'your_email_secret',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4000/api/v1',
    emailTransport: {
        service: 'Gmail',
        auth: {
            user: 'myfrige229@gmail.com',
            pass: 'uviyekjutfptaxcc',
        },
    },
    emailFrom: '"my fridge-noreply" <noreply@yourdomain.com>',
};
exports.recoverPasswordConfig = {
    EMAIL_SECRET: process.env.RECOVER_EMAIL_SECRET || 'your_recovery_email_secret',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4000/api/v1',
    PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL || 'http://localhost:5173/restart-password',
    emailTransport: {
        service: 'Gmail',
        auth: {
            user: 'myfrige229@gmail.com',
            pass: 'uviyekjutfptaxcc',
        },
    },
    emailFrom: '"my fridge-noreply" <noreply@yourdomain.com>',
};
