// DTOs for a task management API
interface CreateTaskDto {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  assigneeId?: number;
}

interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
}

interface TaskResponse extends CreateTaskDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  completed: boolean;
}

// Service interface
interface TaskService {
  create(dto: CreateTaskDto): Promise<TaskResponse>;
  findAll(): Promise<TaskResponse[]>;
  findOne(id: number): Promise<TaskResponse | null>;
  update(id: number, dto: UpdateTaskDto): Promise<TaskResponse>;
  delete(id: number): Promise<void>;
}

// Type aliases for common patterns
type DatabaseConnection = {
  host: string;
  port: number;
  database: string;
};

type ApiResult<T> = {
  data: T;
  message: string;
  success: boolean;
};
