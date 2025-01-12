import React from 'react';

// Always make sure the component name is capitalized. In React (and Next.js), component names must start with an uppercase letter. 
// This is a convention followed by React to distinguish custom components from built-in HTML tags (e.g., <div>, <span>, etc.).
import Navbar from '../../Components/navbar'; // Import the Navbar component (with a capitalized 'N')

/**
 * Layout Component
 * This component is typically used as a wrapper for your page content, providing consistent structure across different pages.
 * It includes any children content passed to it (like page-specific content).
 * 
 * @param {React.ReactNode} children - The children prop will be any nested content or components that are passed to this Layout.
 */
function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {/* Render the children passed to this Layout component */}
      {children}
    </div>
  );
}

export default Layout; // Exporting the Layout component for use in other parts of the application

/**
 * Learning & Explanations:
 * 
 * 1. **Capitalization Rule for Components**: 
 *    - React components must be named with an uppercase first letter. This is because React treats lowercase tag names (e.g., <navbar>) as built-in HTML tags,
 *      while uppercase tag names (e.g., <Navbar>) are recognized as custom React components.
 * 
 * 2. **Children Prop**: 
 *    - The `children` prop is a special prop in React that allows components to be nested inside one another. In this case, whatever page or content is passed as children will be rendered within the Layout component.
 * 
 * 3. **Layout in Next.js**:
 *    - In Next.js, placing a `layout.tsx` or `layout.js` file in a folder allows it to act as a wrapper for all the pages inside that folder.
 *    - It automatically applies to child pages within that folder, enabling consistent structure (e.g., a header, navbar, or footer).
 *    - You can create different layouts for specific subfolders, allowing for different designs or page structures based on the folder's contents.
 * 
 * 4. **Folder-based Layouts**:
 *    - In Next.js, you can define layouts in subfolders. For example, if you put `layout.tsx` in a specific folder (e.g., `pages/dashboard/layout.tsx`), 
 *      the layout will be applied to all pages within that folder automatically. This is useful for different page sections of an application.
 * 
 * 5. **Folders Named with Parentheses in Next.js**:
 *    - In Next.js, you can use parentheses around a folder name (e.g., `(auth)`), and it will be ignored in the routing structure.
 *      - For example:
 *         - If you have a folder named `auth` with a `signup` subfolder containing `page.tsx`, the route to access that page will be `/auth/signup`.
 *         - However, if the folder is named `(auth)` instead of `auth`, the `auth` part will be excluded from the route, and the route will simply be `/signup`.
 *    - This is useful for organizing files without affecting the URL structure.
 * 
 * 6. **Dynamic Routes Using Square Brackets `[]` in Next.js**:
 *    - Square brackets are used to define dynamic routes in Next.js. These allow parts of a route to be dynamic and determined at runtime.
 *    - Examples:
 *      - A file named `[id].tsx` in the `product` folder creates a route like `/product/123`, where `123` is a dynamic segment (`id`).
 *      - Dynamic segments can be accessed via `router.query` in the component.
 * 
 *    - Types of Dynamic Routes:
 *      - **Dynamic Segment**: `pages/product/[id].tsx` → `/product/123` (dynamic value: `id = 123`).
 *      - **Catch-All Routes**: `pages/blog/[...slug].tsx` → `/blog/post/2023` or `/blog/category/post` (handles multiple path levels).
 *      - **Optional Catch-All Routes**: `pages/blog/[[...slug]].tsx` → `/blog` (no segments) or `/blog/post/2023`.
 * 
 *    - Benefits:
 *      - Allows building dynamic pages like user profiles, product details, or blog posts.
 *      - Reduces the need for hardcoded route structures.
 * 
 */

// go to routes-explain.txt for more understanding 