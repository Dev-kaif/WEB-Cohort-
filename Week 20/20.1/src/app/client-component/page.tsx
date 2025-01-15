'use client'

import React, { useState } from 'react';

function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Count: {count}</div>
      <button 
        onClick={() => {
          setCount((prev) => prev + 1);
        }} 
        className="bg-blue-600 px-3 py-1 rounded-full"
      >
        Increase
      </button>
    </div>
  );
}

export default Page;

/**
 * Learnings & Explanations:
 * 
 * 1. **'use client' Directive**:
 *    - This directive tells Next.js that the component should be treated as a client-side component.
 *    - Client components can utilize React features like state (`useState`) and effects (`useEffect`), which are not available in server components.

 * 2. **Client-Side Rendering in Next.js**:
 *    - Even though this is a client component, the initial rendering happens on the server, generating an HTML file for faster load times.
 *    - The HTML file does not include event handlers or React-specific functionality. Instead, React's JavaScript modules are sent separately to the browser.
 *    - Once React is hydrated on the client, event handlers like `onClick` are attached to the HTML elements.

 * 3. **Why This Approach?**:
 *    - Separating HTML and JavaScript allows the page to load faster and be interactive as soon as possible.
 *    - This strategy improves performance and the user experience by showing the content immediately (even if interactivity is delayed until hydration).

 * 4. **Performance Implications**:
 *    - Client components can be slower than pure server components because they require hydration in the browser.
 *    - Use client components only when you need interactivity or stateful logic. For static or read-only content, prefer server components.

 * 5. **Best Practices**:
 *    - Keep client components as lightweight as possible to minimize hydration costs.
 *    - Use server components for static rendering and client components only for dynamic interactions like event handlers or state updates.

 * 6. **Real-World Use Case**:
 *    - This example demonstrates a counter that requires state (`useState`) and an event handler (`onClick`). Hence, it must be a client component.

 * 7. **SEO Implications**:
 *    - Since this component generates HTML on the server before hydration, search engines can crawl the static content (like the initial `Count: 0`) effectively.
 *    - However, dynamic content (e.g., interactions) won't be visible to crawlers unless it's explicitly rendered as static or SSR.

 */
