type USER = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

interface UserRepository {
  findById(id: number): Promise<USER>;
  create(userData: CreateUserDto): Promise<USER>;
  update(id: number, userData: UpdateUserDto): Promise<USER>;
  delete(id: number): Promise<void>;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

// Service class implementing the repository interface
class UserService implements UserRepository {
  constructor(private readonly users: USER[] = []) {}

  async findById(id: number): Promise<USER> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`USER with ID ${id} not found`);
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<USER> {
    const newUser: USER = {
      id: this.users.length + 1,
      ...userData,
      isActive: true,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, userData: UpdateUserDto): Promise<USER> {
    const user = await this.findById(id);
    Object.assign(user, userData);
    return user;
  }

  async delete(id: number): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`USER with ID ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}

// Abstract base class for all repositories
abstract class BaseRepository<T> {
  protected items: T[] = [];

  // Abstract method - must be implemented by subclasses
  abstract create(item: Omit<T, "id">): Promise<T>;

  // Concrete method - shared by all repositories
  async findAll(): Promise<T[]> {
    return [...this.items]; // Return a copy
  }

  async findById(id: number): Promise<T | undefined> {
    return this.items.find((item: any) => item.id === id);
  }

  protected generateId(): number {
    return this.items.length > 0
      ? Math.max(...this.items.map((item: any) => item.id)) + 1
      : 1;
  }
}

// Concrete implementation
class Userrepository extends BaseRepository<USER> {
  async create(userData: Omit<USER, "id">): Promise<USER> {
    const newUser: USER = {
      id: this.generateId(),
      ...userData,
    };
    this.items.push(newUser);
    return newUser;
  }

  // Additional user-specific methods
  async findByEmail(email: string): Promise<USER | undefined> {
    return this.items.find((user) => user.email === email);
  }
}
