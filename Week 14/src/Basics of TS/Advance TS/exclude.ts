// The `Exclude` utility type is used to create a new type by excluding certain types from a union type.
// Syntax: Exclude<UnionType, ExcludedMembers>

// Example:

// Define a union type with several possible values
type UserRoles = "admin" | "editor" | "viewer" | "guest";

// Use `Exclude` to create a new type that excludes specific roles
// Here, we exclude "guest" and "viewer" from the UserRoles type
type ActiveRoles = Exclude<UserRoles, "guest" | "viewer">;

// The resulting type ActiveRoles is equivalent to: "admin" | "editor"

// Example usage:
const role1: ActiveRoles = "admin";  // Valid
const role2: ActiveRoles = "editor"; // Valid

// The following will cause a TypeScript error because "guest" and "viewer" were excluded:
// const role3: ActiveRoles = "guest"; // Error
// const role4: ActiveRoles = "viewer"; // Error

console.log(role1, role2);
