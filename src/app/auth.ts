import NextAuth from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';

export const {handlers,signIn,signOut,auth} = NextAuth({
   providers:[
    CredentialProvider({
        name: 'Credentials',
        credentials:{
            email:{
                label:"Email",
                type:"text",
            },password:{
                label:"Password",
                type:"password",
            },user:{
                label:"User",
                type:"object",
            },parsuser:{
                label:"Parsuser",
                type:"text",
            }

        },
        authorize: ({email, password, user}) => {            
            let parsedUser = null;
            if (typeof user === "string") {
                parsedUser = JSON.parse(user);
                console.log(parsedUser.role);
                if (typeof email === "string" && typeof password === "string") {
                const resultUser = { email: parsedUser.email, role:parsedUser.role,name:parsedUser.name,mobilenumber:parsedUser.phone }; // Mock user, replace with actual user validation logic
                return resultUser;
            }
            }

         return null;
        }
    })
   ],
   pages: {
    signIn: '/login',
    error: '/error', // Error code passed in query string as ?error=error_code
    verifyRequest: '/verify-request', // (used for check email message)
    newUser: null // Will disable the new account creation screen
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Add user role to the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role as string;// Add user role to the session
        
            return session;
        }
    },

    cookies: {
        sessionToken: {
            name: "HelixaaAdminSession",
            options: {
                maxAge: 60 * 60, // 1 hour
            }
        }
    },
    secret: process.env.NEXTAUTH_PUBLIC_SECRET

});