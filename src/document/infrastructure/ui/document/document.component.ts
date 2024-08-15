import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getAllDocumentUseCaseProvider } from './get-all-document.provider';
import { GetAllDocumentUseCase } from '../../../app/get-all-document.app';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    RouterLink
  ],
  providers:[
    getAllDocumentUseCaseProvider
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {

  private getAllDocument = inject(GetAllDocumentUseCase) 

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
