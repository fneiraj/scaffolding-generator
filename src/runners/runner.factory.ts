import { NpmRunner } from './npm.runner';
import { Runner } from './runner';
import { SchematicRunner } from './schematic.runner';
import { PnpmRunner } from './pnpm.runner';
import { RunnerException } from 'src/exceptions/runner.exception';
import { YarnRunner } from './yarn.runner';

export class RunnerFactory {
  public static create(runner: Runner) {
    switch (runner) {
      case Runner.SCHEMATIC:
        return new SchematicRunner();

      case Runner.NPM:
        return new NpmRunner();

      case Runner.PNPM:
        return new PnpmRunner();

      case Runner.YARN:
        return new YarnRunner();

      default:
        throw new RunnerException(`Runner ${runner} not found`);
    }
  }
}
