// =============================================================================
// EXERCISE 1: Type Inference Practice
// =============================================================================
// Create these functions WITHOUT explicit type annotations.
// Let TypeScript infer everything, then hover over variables to see inferred types.

// 1. Function: createUserResponse
// Takes: user object { id: number, name: string, email: string }
// Returns: { user: <the user object>, status: "success", timestamp: <current timestamp> }

export interface User {
  id: number;
  name: string;
  email: string;
}

export function createResponse(user: User) {
  return {
    user,
    status: "success",
    timestamp: new Date(),
  };
}

// 2. Function: parseUserIds
// Takes: array of strings
// Returns: array of numbers (using parseInt)

export function parseUserIds(ids: string[]) {
  const parsedIds = ids.map((id) => {
    return parseInt(id);
  });

  return parsedIds;
}

// 3. Object: apiConfig
// Properties: baseUrl (string), timeout (number), retries (number), endpoints (array of strings)

export const apiConfig = {
  baseUrl: "https://www.example.com",
  timeout: 5,
  retries: 3,
  endpoints: ["/all", "/:id"],
};

// =============================================================================
// EXERCISE 2: Union and Intersection Types
// =============================================================================

// 1. Create a union type SearchFilter that can be:
//    - A string (for text search)
//    - A number (for ID search)
//    - An object with { field: string, value: string | number }
export type searchFilter<T> =
  | string
  | number
  | { field: string; value: string | number };

// 2. Function: processFilter
// Takes: SearchFilter
// Returns: formatted string
// Handle each case of the union appropriately

export function processFilter<T>(filter: searchFilter<T>) {
  if (typeof filter === "string") {
    console.log(`Filter catched with string values: ${filter}`);
    return;
  }
  if (typeof filter === "number") {
    console.log(`Filter cached with number value: ${filter}`);
    return;
  }
  console.log(`Filter with object: ${filter.field}: ${filter.value}`);
}

// 3. Create two types:
//    - BaseUser: { id: number, name: string, email: string }
//    - UserPreferences: { theme: 'light' | 'dark', notifications: boolean }

type BaseUser = {
  id: number;
  name: string;
  email: string;
};

type UserPreferences = {
  theme: "light" | "dark"; // literals
  notifications: boolean;
};

// 4. Create intersection type UserWithPreferences and sample object
type UserWithPreferences = BaseUser & UserPreferences;

export const sampleUser: UserWithPreferences = {
  id: 1,
  name: "Zain Rasool Hashmi",
  email: "hashmizainrasool@gmail.com",
  theme: "dark",
  notifications: true,
};

// =============================================================================
// EXERCISE 3: Literal Types Challenge
// =============================================================================

// 1. Create literal type HttpStatus for: 200, 201, 400, 401, 404, 500

type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

// 2. Create literal type HttpMethod for: 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// 3. Function: createEndpoint
// Takes: method (HttpMethod), path (string starting with '/'), statusCode (HttpStatus)
// Returns: object with these properties plus a handler function

export function createEndpoint(
  method: HttpMethod,
  path: string,
  code: HttpStatus
) {
  if (!path.startsWith("/")) {
    return {
      method,
      path,
      code,
      message: "Invalid path",
      handlerFunction: null,
    };
  }

  return {
    method,
    path,
    code,
    message: "Correct Path, forwarded to handler",
    handlerFunction: (path: string) => `Handling path ${path}`,
  };
}

// =============================================================================
// EXERCISE 4: Safe Type Handling (any vs unknown vs never)
// =============================================================================

// 1. Function: parseApiResponse
// Takes: unknown parameter
// Checks if it's object with { success: boolean, data: any, message?: string }
// Returns: typed object if valid, throws error if invalid
// NO 'any' types allowed!

type Response = {
  success: boolean;
  data: any;
  message?: string;
};

function isApiResponse(obj: unknown): obj is Response {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "success" in obj &&
    "data" in obj &&
    typeof (obj as Response).success === "boolean" &&
    "data" in obj &&
    (typeof (obj as Response).message === "string" ||
      (obj as Response).message === undefined)
  );
}

export function parseApiResponse(obj: unknown) {
  if (isApiResponse(obj)) {
    return obj;
  }
  return Error("Invalid object");
}

// 2. Function: exhaustiveStatusHandler
// Takes: 'loading' | 'success' | 'error' | 'idle'
// Uses switch statement with never type for exhaustive checking
// Returns: appropriate message for each status

// YOUR CODE HERE:
type Status = "loading" | "success" | "error" | "idle";
export function exhaustiveStatusHandler(status: Status) {
  switch (status) {
    case "loading":
      console.log("Loading...");
      break;
    case "idle":
      console.log("Free, ready to RUMBLE!");
      break;
    case "error":
      console.log("Error occured...");
      break;
    case "success":
      console.log("Successful!");
      break;
    default:
      const exhaustedStatus: never = status;
      console.log(`Unhandled error: ${exhaustedStatus}`);
  }
}

// =============================================================================
// EXERCISE 5: Type Assertions Practice
// =============================================================================

// 2. Function: parseJsonSafely
// Takes: JSON string
// Parses and asserts as specific type (you choose the type)
// Include proper error handling
// Compare with type guard approach

// YOUR CODE HERE:
export function parseJsonSafely(JSON: string) {
  const response = JSON as string;
  return response;
}

// =============================================================================
// EXERCISE 6: Function Overloading
// =============================================================================

// Create overloaded function 'search' that can:
// - Take string → return Promise<string[]> (text search)
// - Take number → return Promise<User> (search by ID)

// First, define the types you'll need: - I will use the User interface

const users: User[] = [
  {
    id: 1,
    name: "Zain rasool",
    email: "zainrasoolhashmi@gmail.com",
  },
  {
    id: 2,
    name: "Zafar Abbas",
    email: "zafarabbas@gmail.com",
  },
  {
    id: 3,
    name: "Saleem Ashfaq",
    email: "SaleemAshfaq@gmail.com",
  },
];

const strings: string[] = [
  "Hello",
  "This is module 2 of Typescript for Nest JS",
  "Bye!",
];

// YOUR CODE HERE:
export function search(input: number | string): Promise<User | string[]> {
  if (typeof input === "number") {
    const foundUser = users.find((user) => user.id === input);
    if (!foundUser) {
      return Promise.reject(new Error(`No user with ID: ${input} as found`));
    }
    return Promise.resolve(foundUser);
  }

  const results = strings.filter((str) => str.includes(input));
  if (!results) {
    return Promise.reject(new Error("No matching string found"));
  }
  return Promise.resolve(results);
}

// =============================================================================
// EXERCISE 7: Optional vs Undefined Practice
// =============================================================================

// 1. Interface: CreateUserRequest
// Required: name, email
// Optional: phone, bio
// Must be provided but can be undefined: profileImage

// YOUR CODE HERE:
interface CreateUserRequest {
  name: string;
  email: string;
  phone?: number;
  bio?: string;
  profileImage: string | undefined;
}

// 2. Function: validateUser
// Takes: CreateUserRequest
// Checks required fields, handles optional fields, deals with undefined field
// Returns: boolean or throws descriptive errors

// YOUR CODE HERE:
export function validateUser(req: CreateUserRequest) {
  const cond1: boolean = "name" in req;
  const cond2: boolean = "email" in req;

  if (cond1 && cond2 && req.phone && req.bio && req.profileImage) {
    return {
      name: req.name,
      email: req.email,
      contact: req.phone,
      info: req.bio,
      imageUrl: req.profileImage,
    };
  }

  if (!(cond1 && cond2)) {
    return `invalid request:${req}`;
  }

  return {
    name: req.name,
    email: req.email,
  };
}

// Putting it all together
type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type HttpStatusCodes = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;

// api response
type ApiResponse<T> = {
  data: T;
  status: "success";
  statusCode: HttpStatusCodes;
  timestamp: number;
};

// Error Response
type ErrorResponse = {
  error: string;
  status: "failure";
  statusCode: HttpStatusCodes;
  timestamp: number;
};

// config types
type BasicConfig = {
  headers?: Record<string, string>;
};

type AdvancedConfig = {
  headers?: Record<string, string>;
  method: HttpMethods;
  timeout: number;
  retryCount: number;
};

type AuthConfig = {
  headers?: Record<string, string>;
  token: string;
  method: HttpMethods;
};

type RequestConfig = BasicConfig | AdvancedConfig | AuthConfig;

// type guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).email === "string"
  );
}

function isUserArray(obj: unknown): obj is User[] {
  return Array.isArray(obj) && obj.every(isUser);
}

function isapiResponse<T>(
  obj: unknown,
  dataGuard: (data: unknown) => data is T
): obj is ApiResponse<T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj &&
    "status" in obj &&
    "statusCode" in obj &&
    "timestamp" in obj &&
    (obj as any).status === "success" &&
    typeof (obj as any).statusCode === "number" &&
    typeof (obj as any).timestamp === "number" &&
    dataGuard((obj as any).data)
  );
}

// api func
export async function apiCal<T>(
  url: string,
  config?: RequestConfig,
  dataGuard?: (data: unknown) => data is T
): Promise<unknown | ApiResponse<unknown> | ApiResponse<T>> {
  // simulating API call (will fetch in irl)
  const mockResponse = {
    data: { id: 1, name: "John Doe", email: "JohnDoe@example.com" },
    status: "success",
    statusCode: 200,
    timestamp: new Date(),
  };

  if (!config && !dataGuard) {
    return mockResponse.data; // unknown
  }

  if (config && !dataGuard) {
    return mockResponse;
  }

  if (config && dataGuard) {
    if (isapiResponse(mockResponse, dataGuard)) {
      return mockResponse;
    } else {
      throw new Error("Invalid API format");
    }
  }

  throw new Error("Invalid function call");
}
