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
