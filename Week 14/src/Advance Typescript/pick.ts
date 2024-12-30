// Define the User interface
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    DOB: Date;
}

// Pick API in TypeScript:
// The `Pick` utility type allows us to create a new type by selecting specific properties from an existing interface.
// It creates a subset of the original interface.

// Example: Creating a type that only includes 'name', 'password', and 'DOB' from the User interface
type UpdateUser = Pick<User, 'name' | 'password' | 'DOB'>;


const UpdateUserProfile = (user: UpdateUser) => {
    // Logic to update the user in the database
    console.log(`Updating user:`, user);
};

// Example usage
UpdateUserProfile({
    name: "John Doe",
    password: "newPassword123",
    DOB: new Date("2004-01-01"),
});
