/*

Exercise 1: Basic Service Class (Beginner)
Objective: Create a basic service class with proper typing and access modifiers.
Create a ProductService class with the following requirements:

Private property products (array of Product objects)
Public method getAllProducts() that returns all products
Public method getProductById(id: number) that returns a product or throws an error
Private method validateProduct(product: Product) that checks if title and price are valid

*/

interface Product {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
}

class ProductService {
  private products: Product[] = [
    {
      id: 1,
      title: "DVD",
      price: 13.75,
      inStock: true,
    },
    {
      id: 2,
      title: "Bucket",
      price: 13,
      inStock: true,
    },
    {
      id: 3,
      title: "Chassi",
      price: 55,
      inStock: true,
    },
    {
      id: 4,
      title: "RTX 4070",
      price: 499,
      inStock: false,
    },
    {
      id: 5,
      title: "DDR5 RAM stick",
      price: 150,
      inStock: true,
    },
  ];

  private validateProduct(obj: Product): boolean {
    const COND1 = typeof obj.price === "number";
    const COND2 = typeof obj.title === "string";

    if (COND1 && COND2) {
      return true;
    }

    return false;
  }

  public getAllProducts() {
    return this.products;
  }

  public getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);

    if (!product || !this.validateProduct(product)) {
      return "Invalid id";
    }

    return product;
  }

  public checkProductExist(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return false;
    }

    return true;
  }

  public getPrice(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i].price;
      }
    }

    return 0;
  }
}

export default new ProductService();

/*

Exercise 2: Constructor Shorthand and Dependency Injection (Intermediate)
Objective: Practice NestJS-style constructor parameter shorthand.
Create an OrderService that depends on ProductService and UserService

*/

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Regular";
}

class UserService {
  private users: User[] = [
    {
      id: 1,
      name: "Zain Rassol",
      email: "zainrasool@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Ammar Qasmi",
      email: "aq@gmail.com",
      role: "Regular",
    },
    {
      id: 3,
      name: "Shazam Khan",
      email: "shazamK@gmail.com",
      role: "Regular",
    },
  ];
  public checkUserExists(id: number): boolean {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return false;
    }

    return true;
  }
}

interface Order {
  id: number;
  userId: number;
  productIds: number[];
  total: number;
  createdAt: Date;
}

interface CreateOrderDto {
  userId: number;
  productIds: number[];
}

interface response {
  message: string;
  statusCode: number; // better prac is to set it as a literal of codes
}

class OrderService {
  private orders: Order[] = [];
  // dependency injection
  constructor(
    private readonly Users: UserService,
    private readonly Products: ProductService
  ) {}

  public createOrder(order: CreateOrderDto): CreateOrderDto | response {
    // validate user and products
    const isUser = this.Users.checkUserExists(order.userId);

    if (!isUser) {
      return {
        message: "User not found",
        statusCode: 404,
      };
    }

    let isProd = false;

    for (let i = 0; i < order.productIds.length; i++) {
      isProd = this.Products.checkProductExist(order.productIds[i]);

      if (!isProd) {
        return {
          message:
            "Invalid request: Product id not found, Order creation Cancelled",
          statusCode: 404,
        };
      }
    }

    let totalPrice = 0;
    for (let i = 0; i < order.productIds.length; i++) {
      totalPrice = totalPrice + this.Products.getPrice(order.productIds[i]);
    }

    const orderObj: Order = {
      id: Math.random() + 1,
      userId: order.userId,
      productIds: order.productIds,
      total: totalPrice,
      createdAt: new Date(),
    };

    // create the new order
    this.orders.push(orderObj);

    return order;
  }
}

const userService = new UserService();
const productService = new ProductService();
export const orderService = new OrderService(userService, productService);

/* 

Exercise 3: Abstract Base Repository (Advanced)
Objective: Create reusable abstract class with generics.

Create abstract BaseService<T> with:
// - Protected items array of type T[]
// - Abstract method create(data: Omit<T, 'id'>): Promise<T>
// - Concrete method findAll(): Promise<T[]>
// - Concrete method findById(id: number): Promise<T>
// - Protected method generateId(): number

*/

abstract class BaseService<T> {
  protected items: T[] = [];

  // must be implemented by the sub class!
  abstract create(data: Omit<T, "id">): Promise<T>;

  // concrete methods defined here will be inehrited as it is

  async findAll(): Promise<T[]> {
    return [...this.items]; // return a copy
  }

  async findById(id: number) {
    const resp = this.items.find((i: any) => i.id === id);
    return resp;
  }

  protected generateId(): number {
    return this.items.length > 0
      ? Math.max(...this.items.map((item: any) => item.id)) + 1
      : 1;
  }
}

interface Category {
  id: number;
  name: string;
  description: string;
}

class CategoryService extends BaseService<Category> {
  async create(categoryData: Omit<Category, "id">): Promise<Category> {
    const category: Category = {
      id: this.generateId(),
      ...categoryData,
    };

    // save category
    this.items.push(category);
    return category;
  }

  // additional method
  async findByName(name: string) {
    return this.items.find((category) => category.name === name);
  }
}

export const categoryService = new CategoryService();

/*
Exercise 4: Static Utilities and Configuration (Intermediate)
Objective: Use static methods and properties for shared utilities.

// Create a ValidationHelper class with static methods:
// - isValidEmail(email: string): boolean
// - isValidPassword(password: string): boolean (min 8 chars, 1 number, 1 uppercase)
// - DEFAULT_PASSWORD_MIN_LENGTH static property
// - validateUserData(userData: CreateUserDto): string[] (returns array of error messages)

*/

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

class ValidationHelper {
  static readonly DEFAULT_PASSWORD_MIN_LENGTH = 8;

  static isValidEmail(email: string): boolean {
    return email.endsWith("@gmail.com") || email.endsWith("@outlook.com");
  }

  static isValidPassword(password: string) {
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLength =
      password.length > ValidationHelper.DEFAULT_PASSWORD_MIN_LENGTH;

    return hasLength && hasNumber && hasUpper;
  }

  validateUserData(userData: CreateUserDto): string[] {
    let errors: string[] = [];

    const isValidEmail = ValidationHelper.isValidEmail(userData.email);
    const isValidPassword = ValidationHelper.isValidPassword(userData.password);

    if (!isValidEmail) {
      errors.push("Invalide Email format");
    }

    if (!isValidPassword) {
      errors.push("Please enter a valid password!");
    }

    return errors;
  }
}

export const validator = new ValidationHelper();
