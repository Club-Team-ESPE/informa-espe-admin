import { New } from '../domain/new.entity';
import {
  NewRepository
} from '../domain/new.repository';

export class AddNewUseCase{

  constructor(
    private repository: NewRepository,
  ){}

   run(entity : FormData):Promise<void>{

     return this.repository.add(entity)
  }

}