import { Announcement } from "../domain/announcement.entity";
import { AnnouncementRepository } from "../domain/announcement.repository";


export class AddAnnouncementUseCase{
  constructor(
    private repo : AnnouncementRepository
  ){}
   run(entity:Announcement):Promise<void>{

    return this.repo.add(entity)
  }

}