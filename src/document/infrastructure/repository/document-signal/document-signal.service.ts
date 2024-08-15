import { 
  Injectable,
  InjectionToken,
  computed,
  inject,
  signal
 } 
from '@angular/core';
import { DocumentNgHttpRepository } from '../document-nghttp.repository';
import { DocumentRepository } from '../../../domain/document.repository';
import { GetAllDocument } from '../../../app/get-all-document.app';
import { getAllDocumentUseCaseProvider } from '../../ui/document/get-all-document.provider';


@Injectable({
  providedIn: 'root',
})
export class DocumentSignalService {


  private getAllDocument = inject(GetAllDocument) 

  #state = signal<any>({
    documents : [] 
  })

  public documents = computed(():any => this.#state().documents)

  constructor(){
    this.getAllDocument
    .run()
    .then(resp=> {
      this.#state.set({
        documents: resp
      })
    })
  }


}
