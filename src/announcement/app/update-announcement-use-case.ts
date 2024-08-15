import { Announcement } from "../domain/announcement.entity";
import { AnnouncementRepository } from "../domain/announcement.repository";


export class UpdateAnnouncementUseCase{
  constructor(
    private repo : AnnouncementRepository
  ){}
   run(entity:Announcement, id :number):Promise<void>{

    return this.repo.update(entity, id)
  }

}