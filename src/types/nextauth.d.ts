import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        email?: string; // Ensure email is part of User interface
        role?: string; // Add role property to User interface
    }

    interface Token {
        email?: string; // Ensure email is part of Token interface
        role?: string; // Add role property to Token interface
    }

    interface Session {
        user:{
            role?: string; // Add role property to Session user interface

        }&DefaultSession["user"]
    }
}

