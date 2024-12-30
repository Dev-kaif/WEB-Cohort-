// Define the User interface
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    DOB: Date;
}

// Partial API in TypeScript:
// The `Partial` utility type makes all properties of a type optional.
// This is helpful when you only want to update specific properties without requiring all of them.
// for example if you just wanna update the name , you dont have to pass on props conataing password and DOB 
type PartiallyUpdate = Partial<User>;

// How `Partial` transforms a type:
// The `PartiallyUpdate` type looks like this:
type PartiallyUpdate1 = {
    name?: string;
    email?: string;
    password?: string;
    DOB?: Date;
};


const UpdateUser = (user:PartiallyUpdate) => {
    // Logic to update the user in the database
    console.log(`Updating user:`, user);
};


UpdateUser({
    name: "John Doe", // Only updating the name
});
