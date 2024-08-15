
import { AnnouncementRepository } from "../domain/announcement.repository";


export class DeleteAnnouncementUseCase{
  constructor(
    private repo : AnnouncementRepository
  ){}
   run(id: number):Promise<void>{
  

    return this.repo.delete(id)
  }

}