/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TaskStatus } from './task.enum';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;

}