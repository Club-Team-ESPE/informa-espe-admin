import { Announcement } from "../domain/announcement.entity";
import { AnnouncementRepository } from "../domain/announcement.repository";


export class GetByIdAnnouncementUseCase{
  constructor(
    private repo : AnnouncementRepository
  ){}
   run(id:number):Promise<Announcement>{

    return this.repo.getById(id)
  }

}