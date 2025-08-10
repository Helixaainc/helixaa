import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "lib/firebase";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { id, text, sender, timestamp, read ,shopid} = await req.json();
console.log("id : ",id,"text : ",text,"sender : ",sender,"timestamp : ",timestamp,"read : ",read,"shopid : ",shopid);

    if(!id || !text || !sender || !timestamp ) {
        return new NextResponse(JSON.stringify({ error: 'All fields are required' }), {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
    };

    try {

    const chatRef = collection(db, `shop/${shopid}/chat`);
    await addDoc(chatRef, {
        senderId: sender,
        message: text,
        read: read,
        sender: sender,
        timestamp: Timestamp.now(),
        type:1
    });

    if(chatRef){
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
    }
    
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Failed to send message' }), {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
    }
}