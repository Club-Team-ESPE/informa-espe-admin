
import {
  NewRepository
} from '../domain/new.repository';

import { New } from '../domain/new.entity';


export class GetAllNewUseCase {
  constructor(
    private repo : NewRepository
  ){}
  
   run():Promise<New[]>{
  

    return this.repo.getAll()
  }

}