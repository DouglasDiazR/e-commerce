import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  async uploadImg(id: string, image: string) {
    return this.filesRepository.uploadImg(id, image);
  }
}
