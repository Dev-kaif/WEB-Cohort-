// Importing 'getServerSession' from NextAuth to fetch session data on the server
import { getServerSession } from "next-auth"

// Defining function as an async server-side component
async function page() {
  // Fetching the user's session securely on the server
  const session = await getServerSession();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
  };

  // Returning a component that displays the session data as JSON
  return (
    <div style={containerStyle}>
      {JSON.stringify(session)} 
    </div>
  );
}

export default page;

/*
 Key Learnings:

 1. **getServerSession vs. useSession**:
    - `getServerSession`: Used to fetch the session data securely on the server side. It is ideal for server-side rendering (SSR) 
        or when session data is needed before rendering the page.
    - `useSession`: A React hook used in client-side components to access session data. It is reactive,
         meaning it updates as the session state changes (e.g., when a user logs in or out).
    - Use `getServerSession` when security is critical, such as during server-side rendering or API calls. 
    - Use `useSession` for real-time, client-side interactions where session state updates dynamically.
 
 2. **Security of Session Data**: With `getServerSession`, session data never touches the client until explicitly passed,
     reducing the risk of exposing sensitive information.
 
 3. **When to Use Server-Side Sessions**: 
    Use `getServerSession` for pages that:
    - Need to prefetch user-specific data on the server.
    - Require conditional rendering based on user authentication state (e.g., admin-only pages).
    - Involve logic that relies on session data, such as making server-side API requests on behalf of the user.
*/ 
