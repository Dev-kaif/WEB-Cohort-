import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

async function createUser() {
    // Create a new user with the specified data
    await client.user.create({
        data: {
            username: "adminKali",
            password: "123456789",
            age: 51
        }
    });

    // Delete a user based on the specified condition in the "where" clause
    await client.user.delete({
        where: {
            id: 1 // Deletes the user with ID 1
        }
    });

    // Update a user's information based on the specified condition in the "where" clause
    // Provide the updated data in the "data" object
    await client.user.update({
        where: {
            id: 1 // Finds the user with ID 1 to update
        },
        data: {
            username: "admin33" // Updates the username to "admin33"
        }
    });

    // Retrieve a single user matching the specified condition and find the todos of the user (happens due to foreign key relation)
    await client.user.findFirst({
        where: {
            id: 1 // Finds the first user with ID 1
        },
        include:{
            todos:true // make true to the values you wanna find 
        }
    });

    // Retrieve multiple users matching the specified condition
    await client.user.findMany({
        where: {
            id: 1 // Finds all users with ID 1
        }
    });
}

createUser()
