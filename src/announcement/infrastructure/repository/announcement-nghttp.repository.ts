import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

import { Announcement } from "../../domain/announcement.entity";
import { AnnouncementRepository } from "../../domain/announcement.repository";
import { ApiSrc } from "../../../app/shared/api";
import { lastValueFrom, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class  AnnouncementNgHttpRepository implements AnnouncementRepository{

  private httpClient = inject(HttpClient);

  constructor(){}
  
  add(entity: Announcement): Promise<void> {
    return lastValueFrom<void>(
      this.httpClient
          .post<void>(`${ApiSrc.urlBase}/announcements`, entity)
    )   
  }
  
  update(entity: Announcement, id :number): Promise<void> {
    return lastValueFrom<void>(
      this.httpClient
          .put<void>(`${ApiSrc.urlBase}/announcements/${id}`, entity)
    )   
  }
  getAll(): Promise<Announcement[]> {
    return   lastValueFrom<Announcement[]>( 
      this.httpClient
          .get<Announcement[]>(`${ApiSrc.urlBase}/announcements`).pipe(
            tap(data => data)
          )
    )
    
  }
  getById(id: number): Promise<Announcement> {
    return  lastValueFrom<Announcement>( 
      this.httpClient
          .get<Announcement>(`${ApiSrc.urlBase}/announcements/${id}`).pipe(
            tap(data => data)
          )
    )
  }
  delete(id: number): Promise<void> {
    return   lastValueFrom<void>( 
      this.httpClient
          .delete<void>(`${ApiSrc.urlBase}/announcements/${id}`)
    )
  }



}