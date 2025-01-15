interface Param {
    params: {
      blogId: string[]; 
    };
  }
  
  async function page({ params }: Param) {
    const id = params.blogId;
  
    return (
      <div className="flex flex-col gap-10">
        {/* Display the entire blogId array as a string for visualization */}
        <div>Blog Page {JSON.stringify(id)}</div>
      </div>
    );
  }
  
  export default page;
  
  /**
   * Learnings & Explanations:
   * 
   * 1. **Catch-All Routes in Next.js**:
   *    - To handle multiple dynamic segments, Next.js allows you to create a folder named `[...blogId]`.
   *    - This folder matches routes with any number of path segments, such as:
   *      - `/blog/1`
   *      - `/blog/1/2/3`
   *      - `/blog/some/other/path`
   * 
   * 2. **Accessing Route Parameters**:
   *    - In a catch-all route, `params.blogId` will be an array containing all the segments of the route.
   *    - For example:
   *      - Route `/blog/1/2/3`
   *      - `params.blogId = ["1", "2", "3"]`
  
   * 3. **Default Route for Folders**:
   *    - If you want to handle a default route for `/blog` without extra segments, create a `page.tsx` file inside the `blog` folder.
   *    - The default route file (`blog/page.tsx`) handles requests to `/blog`.
   *    - The catch-all route file (`blog/[...blogId]/page.tsx`) handles requests to `/blog/*`.
  
  
   * 4. **Potential Use Cases**:
   *    - Catch-all routes are ideal for cases like dynamic breadcrumbs, nested content, or multi-level routing structures.
  
  
   */
  