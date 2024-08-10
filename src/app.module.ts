import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { CostModule } from './cost/cost.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule,AuthModule,CostModule],
  controllers: [AppController,HealthController],
  providers: [AppService],
})
export class AppModule {}
