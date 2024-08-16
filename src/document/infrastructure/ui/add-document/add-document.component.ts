import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnChanges, signal, Signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddDocumentUseCase } from '../../../app/add-document.app';
import { addDocumentUseCaseProvider } from './add-document.provider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { objToFormData } from '../../../../app/shared/utils/objectToFormData';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-add-document',
  standalone: true,
 
  imports: [
    RouterLink,
    ReactiveFormsModule, 
    JsonPipe,
    ButtonModule,
    RippleModule,
    FileUploadModule,
    CommonModule
  ],
  providers:[
    addDocumentUseCaseProvider
  ],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent {

  addDocument : AddDocumentUseCase = inject(AddDocumentUseCase)

  private router = inject(Router)
  public toUploadDoc !:File;



  public  form = signal<FormGroup>(
   new FormGroup(
    {
      name: new FormControl('', /* Validators.required */)
    }
   )
  )

  onUpload($event:any) {
    
   
    this.toUploadDoc=($event.files[0]);

   console.warn(this.toUploadDoc)
  
}

  onSubmit():void{
    let fd = objToFormData(
      {
        ...this.form().value,
        file: this.toUploadDoc
      }
    )
    
    console.info(this.toUploadDoc)
    console.info(
      fd
      
    )
    for (const pair of fd.entries()) {
      console.warn(`${pair[0]}: ${pair[1]}\n`);
    }
    /* this.addDocument
    .run(fd)
    .then(()=>{
      this.router.navigate(['document'],);
    })
    .catch(err=>{
      console.error(err)
    }) */
  }

}
  

 

