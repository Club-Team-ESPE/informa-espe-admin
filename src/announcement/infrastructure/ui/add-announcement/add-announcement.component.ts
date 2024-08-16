import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddAnnouncementUseCase } from '../../../app/add-announcement-use-case';
import { addAnnouncementUseCaseProvider } from './add-announcement.provider';
import { CustomValidator } from './add-announcement-validator';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CalendarModule
  ],
  providers:[
    addAnnouncementUseCaseProvider
  ],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.css'
})
export class AddAnnouncementComponent {
  addAnnoucement = inject(AddAnnouncementUseCase)
  router = inject(Router)

  public form = signal<FormGroup>(
   new FormGroup(
    {
      remitente: new FormControl('Club Team ESPE', 
        [
         Validators.required, 
         CustomValidator.noUpperCaseAtStart
        ]
      ),
      titulo : new FormControl('Dsdss',
         [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
         ]),
      descripcion : new FormControl('Dsdsd', 
        [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
        ]),
      /* fechaIngreso : new FormControl('', Validators.required), */
      fechaEnvio : new FormControl('2024-08-10', Validators.required),
      tag : new FormControl('AGRO', Validators.required)
    }
   )
  )
  async onSubmit():Promise<void>{
    console.warn(
      `datos enviados: ${this.form().value}`
    )
    if(this.form().valid){

      await this.addAnnoucement
      .run(this.form().value)
      .then()

    this.router.navigate(['announcement'],);
    }
   
  }
}
