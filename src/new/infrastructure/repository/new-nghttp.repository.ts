import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

import { New } from "../../domain/new.entity";
import { NewRepository } from "../../domain/new.repository";
import { ApiSrc } from "../../../app/shared/api";
import { lastValueFrom, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class  NewNgHttpRepository implements NewRepository{

  private httpClient = inject(HttpClient);

  constructor(){}
   add(entity: FormData): Promise<void> {
    return lastValueFrom(
      this.httpClient
          .post<any>(`${ApiSrc.urlBase}/news`, entity)
    )
  }

  update(entity: FormData, id :number): Promise<void> {
    return lastValueFrom<void>(
      this.httpClient
          .put<void>(`${ApiSrc.urlBase}/news/${id}`, entity)
    )   
  }
    getAll(): Promise<New[]> {
    return  lastValueFrom( 
      this.httpClient
          .get<New[]>(`${ApiSrc.urlBase}/news`).pipe(
            tap(data => data)
          )
    )
    
  }
  getById(id: number): Promise<New> {
    return  lastValueFrom<New>( 
      this.httpClient
          .get<New>(`${ApiSrc.urlBase}/news/${id}`).pipe(
            tap(data => data)
          )
    )
  }
  delete(id: number): Promise<void> {
    return  lastValueFrom<void>( 
      this.httpClient
          .delete<void>(`${ApiSrc.urlBase}/news/${id}`)
    )
  }



}