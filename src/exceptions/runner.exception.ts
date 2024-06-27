import { HttpException, HttpStatus } from '@nestjs/common';

export class RunnerException extends HttpException {
  constructor(message: string) {
    super(message ?? 'Command Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
