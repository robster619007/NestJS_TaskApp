import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import  { TaskEntity } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}
  
  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }


  async getTaskById(id: string): Promise<TaskEntity>{
    const taskid = await this.taskRepository.findOne({ where: { id: id } });
    if(!taskid) {
      throw new NotFoundException(`id "${id}" does not exist`);
    }
    return taskid;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    })

    await this.taskRepository.save(task)
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const del_task = await this.taskRepository.delete(id)
    console.log(del_task)
    if (del_task.affected === 0) {
      throw new NotFoundException(`record with ${id} does not exist`)
    }

  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
