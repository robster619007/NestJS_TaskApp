import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status);
  }
}
