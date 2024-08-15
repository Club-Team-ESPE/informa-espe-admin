import { Announcement } from "../domain/announcement.entity";
import { AnnouncementRepository } from "../domain/announcement.repository";


export class GetAllAnnouncementUseCase{
  constructor(
    private repo : AnnouncementRepository
  ){}
   run():Promise<Announcement[]>{
  

    return this.repo.getAll()
  }

}