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

        // If user is found, return the user object; otherwise, authentication fails
        if (user) {
          return user; 
        }
        return null; 
      }
    }),

    // Google authentication provider (allows users to log in using their Google account)
    GoogleProvider({
      clientId: "process.env.GOOGLE_CLIENT_ID", 
      clientSecret: "process.env.GOOGLE_CLIENT_SECRET" 
    }),

    // Instagram authentication provider (allows users to log in using their Instagram account)
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET 
    })
  ],

  // Secret used to sign and encrypt JWT tokens and manage session-related cryptography
  secret: process.env.AUTH_SECRET
})

// Exporting the NextAuth handler for both GET and POST methods to be used in API routes
export { handler as GET, handler as POST }

/*
 Key Learnings:
  1. **Authentication Providers**: 
     NextAuth allows integration of multiple authentication providers, including Credentials (custom login with username/password), Google, and Instagram.

  2. **CredentialsProvider**: 
     - Handles username/password authentication. 
     - Useful for custom login flows that involve database validation. 
     - In production, always hash and securely compare passwords (e.g., using bcrypt or a similar library).

  3. **Environment Variables**: 
     Sensitive values such as `clientId`, `clientSecret`, and `AUTH_SECRET` should be stored in `.env` files. These are never exposed to the client, ensuring security and avoiding hardcoding secrets in the codebase.

  4. **NextAuth Secret** (`secret`): 
     - The `secret` property is crucial for cryptographic operations such as signing and encrypting JSON Web Tokens (JWT) and cookies.
     - This ensures that session data and tokens are securely managed and tamper-proof.
     - It must be defined using an environment variable (`AUTH_SECRET`) and should be a long, random string for security.


  5. **Session Management**: 
     NextAuth abstracts session handling, making it easier to manage user authentication and protect sensitive routes in the application.
*/
