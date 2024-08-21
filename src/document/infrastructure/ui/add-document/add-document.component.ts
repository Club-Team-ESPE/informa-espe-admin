import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnChanges, signal, Signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddDocumentUseCase } from '../../../app/add-document.app';
import { addDocumentUseCaseProvider } from './add-document.provider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { objToFormData } from '../../../../app/shared/utils/objectToFormData';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { fileToBase64 } from '../../../../app/shared/utils/fileToBase64';



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
  public toUploadDoc = signal<File>(new File([''], ''));
  public srcImg = signal<string>('');





  public  form = signal<FormGroup>(
   new FormGroup(
    {
      name: new FormControl('', /* Validators.required */)
    }
   )
  )

  pdfToBase64(file: File):Promise<string>{
    return fileToBase64(file);
  }

  onSelect($event:FileSelectEvent) {
    const input = $event;
    
    
    if(input.files){
      fileToBase64(input.files[0])
      .then(curr => {
        console.warn(curr)
      this.srcImg.set(curr)
      })
      this.toUploadDoc.set(input.files[0]);
      console.warn(this.srcImg())
    }
    

   
  
}

  onSubmit():void{
    let fd = objToFormData(
      {
        ...this.form().value,
        file: this.toUploadDoc()
      }
    )
    
    console.info(this.toUploadDoc())
    console.info(
      fd
      
    )
    for (const pair of fd.entries()) {
      console.warn(`${pair[0]}: ${pair[1]}\n`);
    }
    this.addDocument
    .run(fd)
    .then(()=>{
      this.router.navigate(['document'],);
    })
    .catch(err=>{
      console.error(err)
    })
  }

}
  

 

