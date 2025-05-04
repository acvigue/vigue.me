import { createTransport } from 'nodemailer';

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);

    const body = await readBody(event);

    const { name, email, employer, message } = body;

    if (!name || !email || !employer || !message) {
        throw createError({
            status: 400,
            message: 'Missing required fields',
            fatal: true,
        });
    }

    const transporter = createTransport({
        host: runtimeConfig.smtp.host,
        port: runtimeConfig.smtp.port,
        secure: runtimeConfig.smtp.secure, // true for 465, false for other ports
        auth: {
            user: runtimeConfig.smtp.auth.user,
            pass: runtimeConfig.smtp.auth.pass,
        },
    });

    const mailOptions = {
        from: `Contact Form <${runtimeConfig.smtp.from}>`,
        replyTo: email,
        to: runtimeConfig.smtp.to,
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nEmployer: ${employer}\nMessage: ${message}`,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
        status: 200,
    }
});