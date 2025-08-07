import { NextRequest } from "next/server";
import { adminAuth, adminDb } from '../../../../../lib/firebase-admin';
import { randomBytes } from "crypto";
import * as admin from "firebase-admin";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { shopName, location, email, phone, status } = await req.json();

  try {



    const randomPassword = generateRandomcPassword();

    const splitShopName = shopName.split(" ")[0];

    let username=shopName.split(" ")[0] + "_" + getRandomString(3);

    let identifyerEmail = username + "@helixxa.paylater.com";




    if (email != null && email !== "") {
      await sendEmail(
        email,
        "Your Shop Account Password",
        `Your account has been created.
        Your username is : ${username}
        Your password is: ${randomPassword}`
      );
    }



    const userRecord = await adminAuth.createUser({
      email: identifyerEmail,
      password: randomPassword,
      emailVerified: false,
      disabled: !(status === 'active' || status === 'trail'),
    });


    await adminDb.collection('shop').doc(userRecord.uid).set({
      shopName,
      location,
      email,
      phone,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error creating shop:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Server error"
    }), { status: 500 });
  }
}
function getRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function sendEmail(to: string, subject: string, text: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Helixaa PayLater Shop Account</h2>
        <p>${text}</p>
        <p style="margin-top: 30px; font-size: 0.9em; color: #6b7280;">
          <strong>Important:</strong> For security reasons, please change your password after your first login.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `Helixaa PayLater <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html: htmlContent,
    });

    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}
function generateRandomcPassword(length: number = 8): string {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%&';
  let password = '';
  
  // Ensure at least one uppercase, one lowercase, one number
  password += charset[Math.floor(Math.random() * 26)]; // Uppercase
  password += charset[26 + Math.floor(Math.random() * 25)]; // Lowercase
  password += charset[52 + Math.floor(Math.random() * 8)]; // Number
  
  // Fill remaining characters
  for (let i = 3; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle
  return password.split('').sort(() => Math.random() - 0.5).join('');
}