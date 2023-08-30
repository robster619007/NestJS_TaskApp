import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.enum";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus
}