import express from "express";
const app = express();

import { Client } from "pg";
const pgClient = new Client("postgresql://Practice-1_owner:q0mHdghY8jZS@ep-autumn-dream-a65ud1pu.us-west-2.aws.neon.tech/Practice-1?sslmode=require");

app.use(express.json()); // Middleware to parse JSON request bodies

// Endpoint for user signup 
app.post('/signup', async (req, res) => {
    // Extract user and address details from the request body
    const { email, username, password } = req.body;
    const { city, country, street, pincode } = req.body;

    try {
        // Warning: This query demonstrates an unsafe practice and should NOT be used.
        // Directly embedding user inputs into SQL queries makes the application vulnerable to SQL injection attacks.
        // For example: Malicious input like "'; DROP TABLE users; --" could damage the database.
        const insertQueryUnsafe = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`;

        // Use parameterized queries for safety and to prevent SQL injection
        // Parameterized queries send the input values separately from the SQL command, treating them as data, not executable code.
        const insertQuerySafe = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`;

        // Query to insert address details into the `address` table
        // The `userId` establishes a relationship with the `users` table to maintain data integrity.
        const insertQueryAddress = `INSERT INTO address (city, country, street, pincode, userId) VALUES ($1, $2, $3, $4, $5);`;

        // **Transaction Management**:
        // Transactions in the database allow executing multiple queries sequentially that are related or dependent on each other.
        // Transactions are enclosed between "BEGIN" and "COMMIT" statements.
        // - A transaction ensures that either all queries within it are successfully executed or none of them are applied (rolled back).
        // - This means if one query fails, all previously executed queries in the transaction are reverted, ensuring data integrity.
        // - Transactions are particularly useful in scenarios where operations must be atomic (all or nothing), such as during payments.
        //   For example, if the backend crashes during a payment transfer, the money should neither be deducted nor added incompletely.
        // Using transactions ensures that operations either succeed as a whole or are safely rolled back in case of failure.
        
        await pgClient.query("BEGIN;");// Start the transaction


        // Insert the user into the `users` table and retrieve their ID
        const response = await pgClient.query(insertQuerySafe, [username, email, password]);
        const userId = response.rows[0].id; // Retrieve the newly inserted user's ID

        // Insert the user's address into the `address` table
        await pgClient.query(insertQueryAddress, [city, country, street, pincode, userId]);

        await pgClient.query("COMMIT;"); // Commit the transaction if all queries succeed

        res.json({ message: "You have signed up successfully!" });

    } catch (error:any) {
        // Roll back the transaction in case of any error to maintain data integrity
        await pgClient.query("ROLLBACK;");
        console.error("Error during signup:", error);

        // Respond with an error message
        res.status(500).json({ message: "Error while signing up", error: error.message });
    }
});


// Endpoint to fetch combined data from multiple tables using SQL JOIN
app.get('/metadata', async (req, res) => {
    // Extract the user ID from the query parameters
    const id = req.query.id;

    // SQL JOIN explanation:
    // - When we need to fetch combined data from two or more related tables (e.g., users and address),
    //   we use JOIN in SQL databases.
    // - A JOIN query combines data based on related keys, like `users.id` and `address.userId`.
    // - While JOINs are powerful and concise, they can be computationally expensive (O(m x n)),
    //   especially on large datasets with millions of records. Use with caution on high-scale databases.

    // SQL query:
    // Fetch user details (id, username, email) and their address details (city, country, street, pincode)
    // by joining the `users` table with the `address` table based on the `users.id` and `address.userId` relationship.
    const query = `
        SELECT 
            users.id, 
            users.username, 
            users.email, 
            address.city, 
            address.country, 
            address.street, 
            address.pincode 
        FROM 
            users 
        JOIN 
            address 
        ON 
            users.id = address.userId 
        WHERE 
            users.id = $1
    `;

    try {
        // Execute the parameterized query to ensure SQL injection protection
        const response = await pgClient.query(query, [id]);

        // Respond with the fetched data
        res.json({ response: response.rows });
    } catch (error) {
        // Handle errors and send a response with an error message
        res.status(500).json({ message: "Error fetching metadata", error });
    }
});

/*
    **Types of SQL JOINs:**

    1. **INNER JOIN**:
       - Retrieves rows that have matching values in both tables.
       - If no match is found, the row is excluded.
       - Example: Used in the current query to fetch matching data from `users` and `address`.

    2. **LEFT JOIN (or LEFT OUTER JOIN)**:
       - Retrieves all rows from the left table and the matching rows from the right table.
       - If no match is found, the result contains NULL values for the right table columns.

    3. **RIGHT JOIN (or RIGHT OUTER JOIN)**:
       - Retrieves all rows from the right table and the matching rows from the left table.
       - If no match is found, the result contains NULL values for the left table columns.

    4. **FULL OUTER JOIN**:
       - Retrieves rows when there is a match in either the left or the right table.
       - If no match is found, the result contains NULL values for the unmatched columns.

    5. **CROSS JOIN**:
       - Produces the Cartesian product of both tables (every row from the left table combined with every row from the right table).
       - Use cautiously as it can generate a large result set.

    6. **SELF JOIN**:
       - Joins a table to itself, treating it as two separate tables.
       - Useful for hierarchical or recursive data relationships, such as organizational charts.

    **Note**: 
    - Choose the JOIN type based on the data retrieval needs and the relationships between tables.
    - For large datasets, optimize your JOIN queries with indexes to avoid performance bottlenecks.
*/

async function main() {
    await pgClient.connect(); // Connect to the PostgreSQL database
    console.log("Connected to the database");

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
    });
}

main(); 
