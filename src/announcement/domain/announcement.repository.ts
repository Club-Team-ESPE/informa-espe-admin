import { Announcement } from "./announcement.entity";

export abstract class AnnouncementRepository{
  abstract add(entity:Announcement) : Promise<void>;
  abstract update(entity:Announcement, id:number) : Promise<void>;
  abstract getAll(): Promise<Announcement[]>;
  abstract getById(id:number): Promise<Announcement>;
  abstract delete(id: number): Promise<void>;

}