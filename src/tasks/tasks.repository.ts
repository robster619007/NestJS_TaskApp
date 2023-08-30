import { Repository, EntityRepository } from "typeorm";
import { TaskEntity } from "./tasks.entity";

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {

}