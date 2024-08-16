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
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }



}