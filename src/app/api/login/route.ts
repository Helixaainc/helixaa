import { NextRequest,NextResponse } from "next/server";
import { db } from '@/../lib/firebase';
import { collection, query,where,getDocs } from 'firebase/firestore';

export async function POST(req: NextRequest){
    const {email,password} = await req.json();
    if(!email || !password){
        return new NextResponse(JSON.stringify({ error: 'Email and password are required' }), {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
    }



    // 1. seach user in the database
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, 
        where('email', '==', email),
        where('password', '==', password)
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
        return new NextResponse(JSON.stringify({ error: 'Invalid email or password' }), {
            status: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
    }

    // 2. If user exists, return success response
    const userData = userSnapshot.docs[0].data();
    console.log('User logged in successfully:', userData);

    
    return new NextResponse(JSON.stringify({ success: true, user: userData }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
    
}
