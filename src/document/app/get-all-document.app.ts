
import {
  DocumentRepository
} from '../domain/document.repository';

import { Document } from '../domain/document.entity';
import { UseCase } from '../domain/get-all-document.app';

export class GetAllDocumentUseCase implements UseCase{
  constructor(
    private repo : DocumentRepository
  ){}
   run():Promise<Document[]>{
  

    return this.repo.getAll()
  }

}