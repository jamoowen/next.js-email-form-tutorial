import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api


export async function POST(request) {

    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;


    console.log("dealing with request")
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')


    // create transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: username,
            pass: password
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }


}
