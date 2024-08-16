import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectToDatabase } from "./lib/mongodb";
import User from "@/app/models/User"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Add the user ID from the token to the session object
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Add the user ID to the token if the user is available
        token.id = profile.sub;
      }
      return token;
    },
    async signIn({ user, account }) {
      try {
        await connectToDatabase();
        console.log("User object:", user);
        console.log("Account object:", account);

        // Try to find the user by email or googleId
        let existingUser = await User.findOne({
          $or: [{ email: user.email }, { googleId: user.id }]
        });

        if (existingUser) {
          console.log("Existing user found:", existingUser);
          // Update existing user information
          existingUser.name = user.name;
          existingUser.image = user.image;
          existingUser.googleId = user.id; // Ensure googleId is always up to date
          await existingUser.save();
          console.log("Existing user updated successfully");
        } else {
          // Create a new user if not found
          const newUser = new User({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: user.id,
            // Add any other necessary fields
          });
          console.log("New user to be created:", newUser);
          await newUser.save();
          console.log("New user saved successfully");
        }

        // Always return true to allow sign in
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }

        if (typeof error === 'object' && error !== null && 'code' in error) {
          const mongoError = error as { code: number, keyValue: any };
          if (mongoError.code === 11000) {
            console.error('Duplicate key error. Attempted to insert:', mongoError.keyValue);
            // Even if there's a duplicate key error, we should allow sign in
            return true;
          }
        }

        // For any other errors, you might want to deny sign in
        // But this will prevent the user from signing in if there are any issues
        // Consider your security and user experience needs here
        return false;
      }
    }
  }
})