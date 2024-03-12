import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from 'src/models/task.model';
import { AddTaskInput, UpdateTaskInput } from './dto/create.task.dto';

@Resolver(() => 'task')
export class TasksResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Query(() => Task)
  async getTask(@Args('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Mutation(() => [Task])
  async addTask(@Args('input') input: AddTaskInput): Promise<Task[]> {
    return this.taskService.addTask(input);
  }

  @Mutation(() => [Task])
  async updateTask(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'input', type: () => UpdateTaskInput })
    input: UpdateTaskInput,
  ): Promise<Task[]> {
    return this.taskService.updateTask(id, input);
  }

  @Mutation(() => [Task])
  async delete(@Args('id') id: string): Promise<Task[]> {
    return this.taskService.deleteTask(id);
  }
}
