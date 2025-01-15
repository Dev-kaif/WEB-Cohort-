import axios from "axios";

interface Param {
  params: {
    blogId: string;
  };
}

async function page({ params }: Param) {
  // Extract the dynamic route parameter `blogId` from `params`
  const id = (await params).blogId;

  // Fetch data from the API using the extracted `blogId`
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = res.data;

  return (
    <div className="flex flex-col gap-10">
      <div>Blog Page {id}</div>
      <div>Title: {data.title}</div>
    </div>
  );
}

export default page;

/**
 * Learnings & Explanations:
 * 
 * 1. **Dynamic Routing in Next.js**:
 *    - Dynamic routes are created by naming folders or files with square brackets `[ ]`. For example:
 *      - Folder: `[blogId]`
 *      - File: `page.tsx`
 *      - Route: `/blog/:blogId`
 *    - In this case, if the URL is `/blog/123`, the value `123` will be available as `params.blogId`.

 * 2. **Accessing Route Parameters**:
 *    - The `params` object is passed to the `page` function automatically in Next.js when dynamic routes are defined.
 *    - You can extract values from `params` to fetch data or perform specific actions based on the route.

 * 3. **Awaiting `params`**:
 *    - In this example, `params` is awaited to ensure it is fully resolved before being used.
 *    - Although this works, in most cases, `params` is directly accessible without needing `await`.

 * 4. **Why Square Brackets for Folders?**:
 *    - Square brackets in folder names signal that it’s a dynamic segment, allowing Next.js to handle routes dynamically without hardcoding paths.
 *      For example:
 *      - `[id]` in the folder translates to `/id` in the route.

 * 5. **Best Practices for Dynamic Routing**:
 *    - Validate the `params` to ensure it has the required data before making API calls.
 *    - Use a loading or error state to enhance user experience while fetching or handling errors.
 */
