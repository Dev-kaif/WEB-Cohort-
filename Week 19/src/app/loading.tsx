import React from 'react'

function loading() {
  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            Loading.....
        </div>
    </div>
  )
}

export default loading

/**
 * Learnings & Explanations:
 * 
 * 1. **Deciding Where to Use a Loading Component**:
 *    - Loading components are typically used for **authenticated pages** (e.g., dashboards) rather than public-facing pages (e.g., landing pages).
 *    - **Why avoid loading on landing pages?**
 *      - Landing pages rely heavily on **Search Engine Optimization (SEO)**.
 *      - If a loading component is displayed on the landing page, Google’s HTML crawlers might not be able to read or index the actual content of the website.
 *      - This reduces keyword visibility, making the website SEO-unoptimized and potentially hurting its ranking on search engines.
 * 
 * 2. **Loading on Authenticated Pages (e.g., Dashboard)**:
 *    - For authenticated pages, SEO is not a concern because:
 *      - These pages are typically behind authentication walls (e.g., dashboards, user profiles).
 *      - Google crawlers do not access private or restricted pages, so having a loading component here is perfectly fine.
 * 
 * 3. **Special File Naming in Next.js**:
 *    - In Next.js, if you create a file named `loading.tsx` in the same folder as your `page.tsx`, it will automatically act as the **loading UI** for that page.
 *    - **When does `loading.tsx` render?**
 *      - It renders automatically while the `page.tsx` is performing asynchronous operations (e.g., fetching data).
 *      - Once the asynchronous operations are complete, the `loading.tsx` is replaced by the actual content of the `page.tsx`.
 * 
 * 4. **SEO Best Practices with Next.js**:
 *    - Avoid placing significant loading components or empty placeholders on pages that are meant to rank on search engines.
 *    - Instead, use **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)** to ensure that the page content is rendered and available for crawlers.
 */
