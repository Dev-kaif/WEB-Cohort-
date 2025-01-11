// React is not optimized for Search Engine Optimization (SEO) because it initially returns an empty HTML file to the browser, 
// with all the application data provided in a JavaScript file. 

// Google's HTML crawlers, which analyze websites to rank them based on keywords and content, 
// cannot effectively read React's empty HTML files. As a result, React applications may not rank well in search engine results.

// Next.js solves this problem by enabling server-side rendering (SSR).
// With SSR, Next.js runs React components on a frontend server to pre-render the HTML, including all necessary elements and content.
// This fully populated HTML file is then sent to the browser/client, making it easier for search engine crawlers to read 
// and properly rank the website in search results.

// Another benefit of server-side rendering is reducing the problem of "waterfalling" (a process where the client sends multiple 
// requests to the backend server for content). With SSR, the frontend server interacts with the backend server directly, 
// eliminating the need for client-side rendering of such requests and improving performance.

// In React, routing is typically handled using the "react-router-dom" library. 
// In contrast, Next.js provides a built-in, file-based routing system.
// Next.js uses page-based routing, where you simply create a folder named after the route and include a `page.tsx` file inside it.
// The `page.tsx` file automatically renders when the corresponding route is accessed. 

// For example, creating a folder named "signup" and adding a `page.tsx` file inside it will create a route for "/signup".

export default function Home() {
  return (
    <div>
      Hello everyone
    </div>
  );
}

