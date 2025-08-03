import { NextRequest,NextResponse } from "next/server";

import { db } from '@/../lib/firebase'
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {

  const { name, email, phone } = await req.json();
  if (!name || !email || !phone) {
    return new NextResponse(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  // 1. Save user details to the database
  let tempPassword = Math.random().toString(36).slice(-8);
 
  await addDoc(collection(db, 'users'), {
    name,
    email,
    phone,
    tempPassword,
    timestamp: new Date(),
  });

  // Here you would typically save the data to your database
  // For demonstration, we'll just log it
  console.log('User Details:', { name, email, phone });
  // Simulate a delay for the database operation
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return a success response
  console.log('User details saved successfully');
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
