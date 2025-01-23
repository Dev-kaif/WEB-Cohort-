// Importing necessary modules from 'next-auth' for authentication and credential providers
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";

// Configuring NextAuth
const handler = NextAuth({
  // Authentication providers to handle different login methods
  providers: [
    // Credentials provider (handles username/password authentication)
    CredentialsProvider({
      name: 'Credentials', // Name of the provider
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" }, // Field for username input
        password: { label: "Password", type: "password" } // Field for password input
      },

      // Async function to handle the login logic (username/password validation)
      async authorize(credentials, req) {
        // Destructuring the credentials received from the client
        const username = credentials?.username
        const password = credentials?.password
        
        // Check if the user exists in the database 
        // (simulation here with dummy user)
        const user = {
          name: "Random name", 
          email: "Random@gmail.com", 
          username: "random", 
          password: "random"
        }

        // If user is found, return the user object, else return null (authentication fails)
        if (user) {
          return user // Successful login
        }
        return null // Failed login
      }
    }),

    // Google authentication provider (allows users to log in using their Google account)
    GoogleProvider({
      clientId: "process.env.GOOGLE_CLIENT_ID", // Using environment variable for Google Client ID
      clientSecret: "process.env.GOOGLE_CLIENT_SECRET" // Using environment variable for Google Client Secret
    }),

    // Instagram authentication provider (allows users to log in using their Instagram account)
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID, // Using environment variable for Instagram Client ID
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET // Using environment variable for Instagram Client Secret
    })
  ]
})

// Exporting the NextAuth handler for both GET and POST methods to be used in API routes
export { handler as GET, handler as POST }

/*
 Key Learnings:
  1. **Authentication Providers**: Different methods of authentication (Credentials, Google, Instagram) can be integrated in a Next.js app using NextAuth.

  2. **CredentialsProvider**: Handles username/password-based authentication, with the flexibility to connect to a database for real-world use cases. Passwords should be hashed securely in practice.

  3. **Environment Variables**: Sensitive information like API keys (clientId, clientSecret) for providers should be stored in environment variables for security purposes, preventing exposure in the codebase.

  4. **Asynchronous Authorization**: The `authorize` function is async, which is useful when you need to interact with external services (e.g., databases or APIs) for authentication logic.
  
  5. **NextAuth Configuration**: You can easily add or remove authentication providers by modifying the `providers` array, making it highly customizable for different login methods.
*/