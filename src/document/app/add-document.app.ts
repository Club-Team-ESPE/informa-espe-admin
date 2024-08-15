import { Document } from '../domain/document.entity';
import {
  DocumentRepository
} from '../domain/document.repository';

export class AddDocumentUseCase{

  constructor(
    private repository: DocumentRepository,
  ){}

   run(entity : Document):Promise<void>{

     return this.repository.add(entity)
  }

}