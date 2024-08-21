import { Component, inject, signal } from '@angular/core';
import { addNewUseCaseProvider } from './add-new.provider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AddNewUseCase } from '../../../app/add-new.app';
import { CustomValidator } from './add-new-validator';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { fileToBase64 } from '../../../../app/shared/utils/fileToBase64';
import { objToFormData } from '../../../../app/shared/utils/objectToFormData';

@Component({
  selector: 'app-add-new',
  standalone: true,
  providers:[
    addNewUseCaseProvider
  ],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CalendarModule,
    FileUploadModule
  ],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {
  addNewUC = inject(AddNewUseCase)
  router = inject(Router)
  public toUploadDoc = signal<File[]>([]);
  public srcImg = signal<string>('');

  pdfToBase64(file: File):Promise<string>{
    return fileToBase64(file);
  }

  onSelect($event:FileSelectEvent) {
    const input = $event;
    
    
    if(input.files){
      fileToBase64(input.files[0])
      .then(curr => {
        //console.warn(curr)
      //this.srcImg.set(curr)
      })
      this.toUploadDoc.set(input.files);
      this.form().patchValue({imagenes: input.files});
      //console.warn(this.srcImg())
    }
  }
  public form = signal<FormGroup>(
   new FormGroup(
    {
    
      titulo : new FormControl<string>('Dsdss',
         [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
         ]),
      descripcion : new FormControl<string>('Dsdsd', 
        [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
        ]),
      /* fechaIngreso : new FormControl('', Validators.required), */
      imagenes: new FormControl<File[]>([], Validators.required)
    }
   )
  )
  async onSubmit():Promise<void>{
    /* console.warn(
      `datos enviados: ${this.form().value}`
    ) */
    if(this.form().valid){
      let fd = objToFormData(
        {
          ...this.form().value,
          imagenes: this.toUploadDoc()
        }
      )
      await this.addNewUC
      .run(fd)
      .then(()=>{
        this.router.navigate(['new'],);
      })

   
    }
   
  }
}
