// TypeScript figures out these types automatically
const userName = "john_doe"; // string
const userAge = 25; // number (not just any number - specifically 25!)
const scores = [85, 92, 78]; // number[]

// Complex objects get inferred too
const apiResponse = {
  data: { users: [{ id: 1, name: "John" }] },
  status: "success",
  timestamp: Date.now(),
};
// TypeScript knows the exact shape of this object!

// demo function for uderstanding - Also inferes types!
function checkAuthStatus() {
  return true;
}
// ✅ Let TypeScript infer - it's obvious
const isLoggedIn = checkAuthStatus(); // boolean inferred from function

// ✅ Be explicit - prevents accidental changes
const API_ENDPOINTS: readonly string[] = ["/users", "/posts", "/comments"]; // readonly prevents mutations

// demo user interface
interface User {
  name: string;
}
// ✅ Function parameters always need types
function processUser(user: User) {
  // user type must be explicit
  return user.name.toLowerCase(); // return type inferred as string
}

// Basic unions
type Status = "loading" | "success" | "error";
type ID = string | number;

// Function handling multiple input types
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return `ID-${id}`; // TypeScript knows id is string here
  }
  return `ID-${id.toString()}`; // TypeScript knows id is number here
}

// Each variant has a unique property for discrimination
type ApiResponse<T> =
  | { status: "success"; data: T; timestamp: number }
  | { status: "error"; error: string; code: number }
  | { status: "loading" };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case "success":
      // TypeScript knows response has 'data' and 'timestamp'
      console.log(response.data);
      break;
    case "error":
      // TypeScript knows response has 'error' and 'code'
      console.log(response.error);
      break;
    case "loading":
      // TypeScript knows this response has no additional properties
      console.log("Loading...");
      break;
  }
}

type user = {
  id: number;
  name: string;
  email: string;
};

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type AuditableUser = user & Timestamps; // Has ALL properties from both types

const auditableuser: AuditableUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Only these exact values are allowed
type Theme = "light" | "dark" | "auto";
type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

// Functions become incredibly precise
function setTheme(theme: Theme) {
  // Only "light", "dark", or "auto" accepted
}

setTheme("light"); // ✅
// setTheme("blue"); // ❌ Error!

// Combine literals with templates
type ApiVersion = "v1" | "v2" | "v3";
type Endpoint = `/${string}`;
type ApiRoute = `/api/${ApiVersion}${Endpoint}`;

// Examples of valid ApiRoute values:
// "/api/v1/users", "/api/v2/posts", "/api/v3/admin/settings"

// Even more powerful patterns
type EventName = `user:${"created" | "updated" | "deleted"}`;
// Valid: "user:created", "user:updated", "user:deleted"

// type guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).name === "string"
  );
}

// Functions that never return normally
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // This never ends
  }
}

// Exhaustive checking with never

function handleStatus(status: Status): string {
  switch (status) {
    case "loading":
      return "Waiting for approval";
    case "success":
      return "Request approved";
    case "error":
      return "Request rejected";
    default:
      // If we handled all cases, this should never be reached
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustiveCheck}`);
  }
}

// Multiple function signatures
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: boolean): string;

// Implementation signature (must handle all overloads)
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `"${value}"`;
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "Yes" : "No";
  }
}

// TypeScript provides correct intellisense for each call
const result1 = formatValue("hello"); // Known to return string
const result2 = formatValue(42); // Known to return string
const result3 = formatValue(true); // Known to return string
