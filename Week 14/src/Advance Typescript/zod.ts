import z from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

// We can derive a TypeScript type from the Zod schema using the `z.infer` utility.
// This eliminates the need to manually define a separate TypeScript interface for the same schema.
// The generated type will exactly match the structure and rules defined in the schema.
// we can create type interface for the req.body usinf zod schema defined before there is no need for defiening the schema again
type UserInterface = z.infer<typeof userProfileSchema> 

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody:userInterface = req.body; // how to assign a type to updateBody?

  if (!success) {
    res.status(411).json({});
    return
  }
  // update database here
  res.json({
    message: "User updated"
  })
});

app.listen(3000);