import { Module } from '@nestjs/common';
import { GenerateProjectController } from './controllers/generate.controller';
import { GenerateProjectService } from './services/generate.service';

@Module({
  imports: [],
  controllers: [GenerateProjectController],
  providers: [GenerateProjectService],
})
export class AppModule {}
