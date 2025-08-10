import { NextRequest, NextResponse } from "next/server";
import { db } from '@/../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET() {
    try {
        const chatsRef = collection(db, 'shop');
        const shopSnapshot = await getDocs(chatsRef);

        // Get all conversations with their messages
        const conversationsUnsorted = await Promise.all(
            shopSnapshot.docs.map(async (doc, index) => {
                const messages = await getChatsWithRawTimestamp(doc.id);
                const lastMessage = messages[0]?.text || 'No messages yet';
                const lastTimestamp = messages[0]?.timestamp || 'No timestamp';
                
                // Safely get timestamp in milliseconds
                const sortTimestamp = messages[0]?.timestampValue 
                    ? Number(messages[0].timestampValue) 
                    : 0;
                
                return {
                    id: index + 1,
                    name: doc.data().shopName,
                    avatar: generateAvatar(doc.data().shopName),
                    lastMessage,
                    timestamp: lastTimestamp,
                    unread: messages.filter(msg => !msg.read).length,
                    status: 'online',
                    messages,
                    shopId: doc.id,
                    sortTimestamp
                };
            })
        );

        // Sort conversations by most recent message (descending)
        const conversations = conversationsUnsorted.sort((a, b) => {
            // Both have no messages
            if (a.sortTimestamp === 0 && b.sortTimestamp === 0) return 0;
            // Only A has no messages
            if (a.sortTimestamp === 0) return 1;
            // Only B has no messages
            if (b.sortTimestamp === 0) return -1;
            // Both have messages - sort by timestamp
            return b.sortTimestamp - a.sortTimestamp;
        });

        return new NextResponse(JSON.stringify({ 
            success: true, 
            conversations
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Error fetching conversations:", error);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Failed to fetch conversations"
        }), { status: 500 });
    }
}

async function getChatsWithRawTimestamp(shopId: string) {
    const chatRef = collection(db, `shop/${shopId}/chat`);
    const q = query(chatRef, orderBy('timestamp', 'desc'));
    const chatsSnapshot = await getDocs(q);

    return chatsSnapshot.docs.map((doc, index) => {
        const timestamp = doc.data().timestamp;
        
        // Handle different timestamp formats
        let timestampValue;
        if (timestamp?.toMillis) {
            timestampValue = timestamp.toMillis(); // Firestore Timestamp
        } else if (timestamp?.seconds) {
            timestampValue = timestamp.seconds * 1000; // Firestore Timestamp (alternative)
        } else if (timestamp instanceof Date) {
            timestampValue = timestamp.getTime(); // JavaScript Date
        } else if (typeof timestamp === 'string') {
            timestampValue = new Date(timestamp).getTime(); // ISO string
        } else {
            timestampValue = 0; // Fallback
        }

        return {
            id: index + 1,
            sender: doc.data().senderId,
            text: doc.data().message,
            timestamp: formatTimestamp(timestamp),
            timestampValue, // Store numeric value for sorting
            read: doc.data().read || false,
            type: doc.data().type
        };
    });
}

async function getChats(shopId: string) {
    const chatRef = collection(db, `shop/${shopId}/chat`);
    const q = query(chatRef, orderBy('timestamp', 'desc'));
    const chatsSnapshot = await getDocs(q);

    return chatsSnapshot.docs.map((doc, index) => ({
        id: index + 1,
        sender: doc.data().senderId,
        text: doc.data().message,
        timestamp: formatTimestamp(doc.data().timestamp),
        read: doc.data().read || false,
        type: doc.data().type
    }));
}

function formatTimestamp(firebaseTimestamp: any) {
    if (!firebaseTimestamp) return 'Unknown time';
    
    const date = firebaseTimestamp.toDate 
        ? firebaseTimestamp.toDate() 
        : new Date(firebaseTimestamp);
    
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
        return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
        return 'Yesterday';
    } else {
        return `${Math.floor(diffInHours / 24)} days ago`;
    }
}

function generateAvatar(name: string) {
    if (!name) return 'SH';
    const parts = name.split(' ');
    return parts.length >= 2 
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
}