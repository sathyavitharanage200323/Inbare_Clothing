import nodemailer from "nodemailer";
import config from "../config/env.js";
import logger from "./logger.js";

const createTransporter = () => {
    if (config.SMTP_HOST) {
        return nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: config.SMTP_PORT === 465,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS,
            },
        });
    }
    return null;
};

const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransporter();
    if (!transporter) {
        logger.warn("Email not configured, skipping email to: " + to);
        return;
    }

    try {
        await transporter.sendMail({
            from: config.EMAIL_FROM,
            to,
            subject,
            html,
        });
        logger.info(`Email sent to ${to}: ${subject}`);
    } catch (error) {
        logger.error(`Email failed to ${to}: ${error.message}`);
    }
};

export const sendWelcomeEmail = (user) =>
    sendEmail({
        to: user.email,
        subject: "Welcome to INBARE!",
        html: `
            <h1>Welcome to INBARE, ${user.firstName}!</h1>
            <p>Thank you for joining our community.</p>
            <p>Explore our latest collections and find your style.</p>
            <br/>
            <p>— The INBARE Team</p>
        `,
    });

export const sendOrderConfirmation = (order, user) =>
    sendEmail({
        to: user.email,
        subject: `Order Confirmation — #${order._id.toString().slice(-8).toUpperCase()}`,
        html: `
            <h1>Order Confirmed!</h1>
            <p>Hi ${user.firstName},</p>
            <p>Your order <strong>#${order._id.toString().slice(-8).toUpperCase()}</strong> has been placed successfully.</p>
            <p><strong>Total:</strong> LKR ${order.totalAmount.toLocaleString()}</p>
            <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            <br/>
            <p>We'll notify you when your order ships.</p>
            <p>— The INBARE Team</p>
        `,
    });

export const sendPasswordReset = (user, resetToken) =>
    sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: `
            <h1>Password Reset</h1>
            <p>Hi ${user.firstName},</p>
            <p>You requested a password reset. Use the token below:</p>
            <p><strong>${resetToken}</strong></p>
            <p>This token expires in 15 minutes.</p>
            <p>If you didn't request this, ignore this email.</p>
        `,
    });

export default sendEmail;
