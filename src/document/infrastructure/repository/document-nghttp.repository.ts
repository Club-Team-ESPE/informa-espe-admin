import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

import { Document } from "../../domain/document.entity";
import { DocumentRepository } from "../../domain/document.repository";
import { ApiSrc } from "../../../app/shared/api";
import { lastValueFrom, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class  DocumentNgHttpRepository implements DocumentRepository{

  private httpClient = inject(HttpClient);

 

  constructor(){}
   add(entity: FormData): Promise<void> {
    return lastValueFrom(
      this.httpClient
          .post<any>(`${ApiSrc.urlBase}/documents`, entity)
    )
      
      
  }
    getAll(): Promise<Document[]> {
    return  lastValueFrom( 
      this.httpClient
          .get<Document[]>(`${ApiSrc.urlBase}/documents`).pipe(
            tap(data => data)
          )
    )
    
  }
  getForId(id: number): Promise<Document> {
    return  lastValueFrom<Document>( 
      this.httpClient
          .get<Document>(`${ApiSrc.urlBase}/documents/${id}`).pipe(
            tap(data => data)
          )
    )
  }
  delete(id: number): Promise<void> {
    return   lastValueFrom<void>( 
      this.httpClient
          .delete<void>(`${ApiSrc.urlBase}/documents/${id}`)
    )
  }



}