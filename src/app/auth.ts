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
            } 
        },
        authorize: ({email,password}) => {
            console.log(email, password);
        const user = {email:"a",role:"admin"}; // Mock user, replace with actual user validation logic
        return user ;
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