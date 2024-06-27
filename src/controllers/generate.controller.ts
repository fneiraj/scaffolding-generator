import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { GenerateProjectService } from '../services/generate.service';
import { GenerateRequestDto } from '../dtos/generate.request.dto';
import { Response } from 'express';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { rimraf } from 'rimraf';
import { CleanZipInterceptor } from 'src/interceptos/clean-zip.interceptor';

@Controller()
export class GenerateProjectController {
  constructor(
    private readonly generateProjectService: GenerateProjectService,
  ) {}

  @Post('/generate-project')
  async createNewProject(
    @Body() body: GenerateRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const zipPath = await this.generateProjectService.createProject(body);
    const file = createReadStream(join(process.cwd(), zipPath));

    res.on('finish', () => {
      rimraf(join(process.cwd(), zipPath), {}).then(() => {
        console.log('Project zip deleted');
      });
    });

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${zipPath}"`,
    });

    return new StreamableFile(file);
  }
}
