// Import the Client class from the 'pg' package to interact with the PostgreSQL database.
import { Client } from "pg";


// There are two ways to provide the PostgreSQL connection details:

// 1. Provide the connection string directly as a single parameter.
const pgClient = new Client("postgresql://Practice-1_owner:q0mHdghY8jZS@ep-autumn-dream-a65ud1pu.us-west-2.aws.neon.tech/Practice-1?sslmode=require");

// 2. Provide the connection details as a configuration object.
const pgClient2 = new Client({
    user: "Practice-1_owner", // Database user name
    password: "q0mHdghY8jZS", // Password for the database user
    host: "ep-autumn-dream-a65ud1pu.us-west-2.aws.neon.tech", // Host URL or IP of the database server
    database: "Practice-1", // Name of the database to connect to
    port: 5432,// Port number for the database connection (default for PostgreSQL is usually 5432)
    ssl:true
});

//its an async procces thats why we need to put it inside the async function 
async function main() {

    // Connect to the database. Await ensures the connection completes before proceeding.
    await pgClient.connect();
    // we send the tas we wanna do such as update create delete by passing the query as string and get the response
    const res = await pgClient.query("SELECT * FROM users")
    console.log(res.rows);
}
main();

