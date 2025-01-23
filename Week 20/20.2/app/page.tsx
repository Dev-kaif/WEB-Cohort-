// Enables client-side rendering, required for hooks like `useSession` in Next.js 13+.
'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Main component: Wraps the app with a session provider to enable authentication features.
export default function Home() {
  return (
    <SessionProvider>
      {/* Nested component to handle authentication logic */}
      <RealHome />
    </SessionProvider>
  );
}

// Component for rendering session-based UI and logic
function RealHome() {
  const session = useSession(); // Fetches the session status and user data.
  const router = useRouter()

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212', 
    color: '#ffffff',
    flexDirection: 'column',
    gap:'2vw'
  };

  return (
    <div style={containerStyle}>
       <div>
        {JSON.stringify(session)}
      </div>
      {/* Displays "Logout" button if the user is logged in */}
      {session.status === "authenticated" && (
        <>
        <Button text="Logout" func={() => signOut()} />
        <Button text={'getServer'} func={()=>{ router.push('/getserver')}}/>
        </>
      )}

      {/* Displays "Sign In" button if the user is not logged in */}
      {session.status === "unauthenticated" && (
        <Button text="Sign In" func={() => signIn()} />
      )}
    </div>
  );
}

function Button({ text, func }) {

  const buttonStyle = {
    backgroundColor: '#1e88e5',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
  };


  return (
    <button onClick={func} style={buttonStyle}>
      {text} 
    </button>
  );
}

/*
Key Learnings:

1. `SessionProvider`:
   - Provides session context to the app, enabling authentication features.
   - Must wrap components that use session-related hooks or functions like `useSession`, `signIn`, and `signOut`.

2. `useSession` Hook:
   - Manages the authentication state and session data of the user.
   - Returns three states:
     - `authenticated`: User is logged in with session data available.
     - `unauthenticated`: User is logged out or not authenticated.
     - `loading`: The session state is being fetched.

3. Authentication Functions:
   - `signIn`: Initiates user authentication and redirects to the sign-in page.
   - `signOut`: Logs the user out and clears the session data.

*/
