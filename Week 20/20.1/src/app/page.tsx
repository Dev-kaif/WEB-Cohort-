//static component
import React from 'react';

function page() {
  return (
    <div>
      <div>hi hello</div>
      <button className="bg-blue-600 px-3 py-1 rounded-full">sign up</button>
    </div>
  );
}

export default page;

/**
 * Learnings & Explanations:
 * 
 * 1. **Static Site Generation (SSG) in Next.js**:
 *    - If a page contains only static HTML and CSS without any data fetching or server-side operations, Next.js automatically generates it as a static site.
 *    - This is because the content is fixed and does not require Server-Side Rendering (SSR) or fetching dynamic data.

 * 2. **Benefits of Static Sites**:
 *    - Static sites are extremely fast because they are pre-rendered at build time.
 *    - They are also highly scalable and can be easily cached on Content Delivery Networks (CDNs).

 * 3. **Forcing Static Behavior**:
 *    - Even for server components, you can explicitly tell Next.js to treat them as static using the `generateStaticParams` or `revalidate` options.
 *    - However, for complex pages, forcing static behavior can increase build times significantly, especially when there are large datasets to pre-render.

 * 4. **Use Cases for Static Pages**:
 *    - Landing pages, marketing sites, or any content that rarely changes can benefit from Static Site Generation.
 *    - It ensures faster loading times and improved SEO.

 * 5. **Best Practices**:
 *    - Avoid mixing static content with dynamic features (e.g., API calls) unless necessary.
 *    - For interactive elements like buttons, ensure they enhance the user experience without depending on server-side data.

 * 6. **Automatic Optimization**:
 *    - Next.js optimizes simple pages like this automatically, reducing the need for manual configuration.
 *    - This makes development faster and more efficient.
 */
