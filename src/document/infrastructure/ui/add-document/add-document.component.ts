import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnChanges, signal, Signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddDocumentUseCase } from '../../../app/add-document.app';
import { addDocumentUseCaseProvider } from './add-document.provider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-add-document',
  standalone: true,
 
  imports: [
    ReactiveFormsModule, 
    JsonPipe,
    ButtonModule,
    RippleModule
  ],
  providers:[
    addDocumentUseCaseProvider
  ],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent {

  addDocument : AddDocumentUseCase = inject(AddDocumentUseCase)

  public  profileForm = signal<FormGroup>(
   new FormGroup(
    {
      name: new FormControl('', Validators.required),
      url : new FormControl('', Validators.required)
    }
   )
  )
  onSubmit():void{
    console.info(
      this.profileForm().value
    )
    this.addDocument
    .run(this.profileForm().value)
  }

}
  

 

