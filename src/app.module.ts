import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import  { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      // Only for development its true. Prod should be false. Use migrations to update db
      synchronize: true,
      retryAttempts: 20,
      // requestTimeout: 300000,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
