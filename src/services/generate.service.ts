import { Body, Injectable } from '@nestjs/common';
import { GenerateRequestDto } from '../dtos/generate.request.dto';
import { AbstractCollection } from 'src/runners/schematics/abstract.collection';
import { CollectionFactory } from 'src/runners/schematics/collection.factory';
import { SchematicOption } from 'src/runners/schematics/schematic.option';
import { Collection } from 'src/runners/schematics/collection';
import { tmpdir, homedir } from 'os';
import fs from 'fs';
import { rimraf } from 'rimraf';

@Injectable()
export class GenerateProjectService {
  async createProject(request: GenerateRequestDto): Promise<string> {
    const projectPath = await this.generateApplicationFiles(request);
    const AdmZip = require('adm-zip');

    const zip = new AdmZip();

    zip.addLocalFolder(projectPath);
    zip.writeZip(`./${request.projectName}.zip`);

    rimraf(projectPath, {}).then(() => {
      console.log('Project folder deleted');
    });

    return request.projectName + '.zip';
  }

  generateApplicationFiles = async (request: GenerateRequestDto) => {
    const collection: AbstractCollection = CollectionFactory.create(
      Collection.NESTJS,
    );
    const schematicOptions: SchematicOption[] =
      this.mapSchematicOptions(request);
    await collection.execute('application', schematicOptions);
    return 'projects/' + request.projectName;
  };

  private mapSchematicOptions = (
    request: GenerateRequestDto,
  ): SchematicOption[] => {
    return [
      new SchematicOption('name', request.projectName),
      //      new SchematicOption('directory', tmpdir() + '/' + request.name),
      // add directory home with mac symbol at start
      new SchematicOption('directory', 'projects/' + request.projectName),
      new SchematicOption('dry-run', false),
      new SchematicOption('skip-git', false),
      new SchematicOption('strict', false),
      new SchematicOption('packageManager', request.packageManager),
      new SchematicOption('collection', '@nestjs/schematics'),
      new SchematicOption('language', request.language),
    ];
  };
}
