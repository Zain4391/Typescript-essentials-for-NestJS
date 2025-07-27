// 📝 Exercise 1: Basic Type Annotations
// TODO: Create these variables with proper TypeScript type annotations:
// - A variable called 'projectName' that can only hold strings
// - A variable called 'version' that can only hold numbers
// - A variable called 'isPublished' that can only hold booleans
// - An array called 'tags' that can only hold strings

export function BasicsAnnotations(): void {
  let projectName: string = "Typescript Annotations";
  let version: number = 1;
  let isPublished: Boolean = true;
  let tags: string[] = ["Typescript", "static code", "Annotations"];

  console.log(
    `Exercise 1 completed! The results: \n1.${projectName}\n2.${version}\n3.${isPublished}\n4.${tags}`
  );
}

// 📝 Exercise 2: Function Type Annotations
// TODO: Convert this JavaScript function to TypeScript with proper types:
// function calculateTax(price, rate) {
//     return price * rate;
// }
// Make sure to add parameter types and return type

export function calculateTax(price: number, rate: number): number {
  return price * rate;
}

// 📝 Exercise 3: Object Type Annotations
// TODO: Create a variable called 'book' with this exact structure:
// - title (string)
// - author (string)
// - pages (number)
// - isAvailable (boolean)
// - publishedYear (number, optional - use ?)
// Give it proper TypeScript types!

interface book {
  title: string;
  author: string;
  pages: number;
  isAvailable: Boolean;
  publishedyear?: number; // optional
}

export function createBook(
  title: string,
  author: string,
  pages: number,
  availability: Boolean
): book {
  return {
    title,
    author,
    pages,
    isAvailable: availability,
  };
}

// 📝 Exercise 4: Function with Object Parameters
// TODO: Write a function called 'formatBook' that:
// - Takes a book object as parameter (with title, author, pages properties)
// - Returns a string in format: "Title by Author (Pages pages)"
// - Add proper TypeScript types for parameters and return value

export function formatBook(Book: book): string {
  return `Book ${Book.title} by Author: ${Book.author} has ${Book.pages} Pages`;
}

// 📝 Exercise 5: Array Types and Function
// TODO: Create an array called 'products' containing objects with:
// - id (number)
// - name (string)
// - price (number)
// Then write a function 'getExpensiveProducts' that:
// - Takes an array of products and a minimum price
// - Returns only products above that price
// - Has proper TypeScript types

interface Product {
  id: number;
  name: string;
  price: number;
}

export const shoppingList: Product[] = [
  {
    id: 1,
    name: "Meat",
    price: 30,
  },
  {
    id: 2,
    name: "Apples",
    price: 18,
  },
  {
    id: 3,
    name: "Trash Bags",
    price: 45,
  },
  {
    id: 4,
    name: "Vegetables",
    price: 70,
  },
  {
    id: 5,
    name: "Bread",
    price: 25,
  },
];

export function getAllExpensiveProducts(
  list: Product[],
  minPrice: number
): Product[] {
  const minPriceProducts = list.filter((product) => product.price > minPrice);
  return minPriceProducts;
}

// 🌟 Bonus Challenge (Optional):
// TODO: Create a function that can accept either a string OR a number
// and returns a string. If it receives a number, convert it to string.
// If it receives a string, return it as-is.
// Hint: Use union types (|)

export function returnString(input: number | string): string {
  if (typeof input === "number") {
    input = <string>(<unknown>input); // typecasting statically typed value. For "any" or "unknown" do <string> input
    return input;
  }
  return input;
}
