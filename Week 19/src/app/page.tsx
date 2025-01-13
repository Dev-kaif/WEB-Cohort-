import axios from "axios";
import Link from "next/link";

// Function to fetch data from the API
async function getData() {
  const response = await axios.get('http://localhost:3000/api');
  return response.data;
}

// Server-side rendering of the page
async function page() {
  // Fetching data on the server side
  const CardData = await getData();

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center flex-col items-center gap-5">
            <div className="border p-8 rounded">
                <div>
                    {/* Displaying fetched data */}
                    Name: {CardData?.name}
                </div>
                <div>
                    Email: {CardData?.email}
                </div>
            </div>
            <div className="flex gap-2">
              {/* use links to naviagte in the next app */}
              <Link className="bg-blue-500 px-2 py-1 rounded-full " href={'/signup'}>Sign up</Link>
              <Link className="bg-blue-500 px-2 py-1 rounded-full " href={'/signin'}>Sign in</Link>
            </div>
        </div>
    </div>
  )
}

export default page;

/**
 * Learnings & Explanations:
 * 
 * 1. **Fetching Data in Next.js**:
 *    - In Next.js, especially when using server-side rendering (SSR) or static site generation (SSG), data fetching should happen server-side.
 *    - This ensures better SEO, faster initial load times, and reduced client-side complexity.
 * 
 * 2. **Avoiding `useState` for Server-Side Rendered Pages**:
 *    - When rendering happens on the server, there's no need to manage state using `useState` or similar hooks, as the page is already rendered with the required data.
 *    - Server-rendered pages reduce the need for client-side re-renders and improve performance.
 * 
 * 3. **Avoiding `useEffect` for Fetching Data**:
 *    - `useEffect` is not suitable for data fetching in server-rendered components because it runs only on the client side.
 *    - Fetching data with `useEffect` can lead to a poor user experience (waterfalling), as the content would not be ready during the initial render and would rely on client-side JavaScript.
 * 
 * 4. **Server-Side Fetching**:
 *    - By fetching data in the component function (as shown in this example), the data is ready during the server-side rendering process.
 *    - This approach ensures that the HTML returned to the browser includes the fully rendered content, making it SEO-friendly.
 * 
 * 5. **When to Use State or Effects**:
 *    - State management (`useState`, `useReducer`) and effects (`useEffect`) are primarily useful for interactive or client-rendered components.
 *    - For SSR or SSG in Next.js, these hooks are unnecessary for simple data fetching and rendering.
 * 
 */
