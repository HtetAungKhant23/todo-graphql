import { HttpException, Injectable } from '@nestjs/common';
import { TASKS } from 'src/mocks/tasks.mock';
import { Task } from 'src/models/task.model';
import { AddTaskInput, UpdateTaskInput } from './dto/create.task.dto';

@Injectable()
export class TasksService {
  tasks = TASKS;

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  async addTask(input: AddTaskInput): Promise<Task[]> {
    const lastTask = this.tasks.slice(-1).pop();
    const task: Task = {
      id: (+lastTask.id + 1).toString(),
      title: input.title,
      description: input.description,
      completed: false,
    };
    this.tasks.push(task);
    return this.tasks;
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task[]> {
    const taskIdx = this.tasks.findIndex((task) => task.id === id);
    if (taskIdx === -1) {
      throw new HttpException('Task not found', 404);
    }
    const currentTask = this.tasks[taskIdx];
    this.tasks[taskIdx] = {
      ...currentTask,
      ...input,
    };
    return this.tasks;
  }

  deleteTask(id: string): Task[] {
    const taskIdx = this.tasks.findIndex((task) => task.id === id);
    if (taskIdx === -1) {
      throw new HttpException('Task not found', 404);
    }
    this.tasks.splice(taskIdx, 1);
    return this.tasks;
  }
}
