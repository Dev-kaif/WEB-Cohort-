import { NextResponse } from "next/server";

// Define a POST handler
export function POST() {
    return NextResponse.json({
        name: "Harkirat",
        email: "kaif123@gmail.com",
        method: "Post",
    });
}

// Define a PUT handler
export function PUT() {
    return NextResponse.json({
        name: "Harkirat",
        email: "kaif123@gmail.com",
        method: "Put",
    });
}

// Define a GET handler
export function GET() {
    return NextResponse.json({
        name: "Harkirat",
        email: "kaif123@gmail.com",
        method: "Get",
    });
}

/**
 * Learnings & Explanations:
 * 
 * 1. **Route Handlers in Next.js**:
 *    - Next.js provides built-in API route handling through special files located in the `app/api` directory.
 *    - Each file can export HTTP method functions (`GET`, `POST`, `PUT`, etc.) to handle specific types of requests.
 *    - These functions act as backend route handlers, similar to Express.js routes but integrated directly within the Next.js framework.
 * 
 * 2. **Separation of HTTP Methods**:
 *    - Defining separate exports for `GET`, `POST`, and other HTTP methods helps in organizing backend logic.
 *    - This approach eliminates the need for manual method checks (e.g., `if (req.method === 'GET')`), making the code cleaner and easier to maintain.
 * 
 * 3. **Directory Structure for API Routes**:
 *    - Place backend files in the `app/api` directory.
 *    - Subfolders define API routes, and the file's name acts as the endpoint.
 *      For example:
 *      - File: `app/api/user/route.ts`
 *      - Endpoint: `/api/user`
 * 
 * 4. **Middleware-Like Behavior**:
 *    - You can add middleware logic before returning a response, such as validation, authentication, or logging.
 *    - This makes API route handlers powerful and customizable.
 * 
 * 5. **Serverless Nature**:
 *    - These route handlers are serverless by default in a production environment (e.g., deployed on Vercel).
 *    - Each function executes in isolation, scaling efficiently with demand.
 * 
 * 6. **Best Practices**:
 *    - Keep logic minimal in route handlers. For complex operations, delegate to helper functions or services.
 *    - Use environment variables for sensitive data like API keys or database URLs.
 *    - Handle errors gracefully using `try-catch` blocks and return appropriate HTTP status codes (e.g., `400`, `500`).
 * 
 * 7. **Dynamic Routes**:
 *    - You can create dynamic routes by naming the file or folder with square brackets.
 *      Example: `app/api/user/[id]/route.ts` maps to `/api/user/:id`.
 *    - Access the dynamic segment (`id`) from the request object.
 */
