"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    EMAIL_SECRET: process.env.EMAIL_SECRET || 'your_email_secret',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4000/api/v1',
    emailTransport: {
        service: 'Gmail',
        auth: {
            user: 'myfrige229@gmail.com',
            pass: 'uviyekjutfptaxcc',
        },
    },
    emailFrom: 'myfrige229@gmail.com',
};
