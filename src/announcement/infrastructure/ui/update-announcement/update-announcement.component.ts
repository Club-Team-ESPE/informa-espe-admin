import { Component, computed, inject, Input, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CustomValidator } from '../add-announcement/add-announcement-validator';
import { updateAnnouncementUseCaseProvider } from './update-announcement.provider';
import { UpdateAnnouncementUseCase } from '../../../app/update-announcement-use-case';
import { GetByIdAnnouncementUseCase } from '../../../app/get-by-id-announcement-use-case';
import { getByIdAnnouncementUseCaseProvider } from './get-by-id-announcement.provider';
import { Announcement } from '../../../domain/announcement.entity';

@Component({
  selector: 'app-update-announcement',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CalendarModule

  ],
  providers:[
    updateAnnouncementUseCaseProvider,
    getByIdAnnouncementUseCaseProvider
  ],
  templateUrl: './update-announcement.component.html',
  styleUrl: './update-announcement.component.css'
})
export class UpdateAnnouncementComponent {

  public  updateAnnounceUC   = inject(UpdateAnnouncementUseCase)
  private getByIdAnnounceUC  = inject(GetByIdAnnouncementUseCase) 
  router = inject(Router)
  @Input('id') id !:number;

  /* #state = signal<any>({
    value:{}
  });

  public announcement = computed(
    ()=>(
      this.#state().value
    )
) */
  public form = signal<FormGroup>(
   new FormGroup(
    {
      remitente: new FormControl(
        '', 
        [
         Validators.required, 
         CustomValidator.noUpperCaseAtStart
        ]
      ),
      titulo : new FormControl(
        '',
         [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
         ]),
      descripcion : new FormControl(
        '', 
        [
          Validators.required,
          CustomValidator.noUpperCaseAtStart
        ]),
      /* fechaIngreso : new FormControl('', Validators.required), */
      fechaEnvio : new FormControl(
        ''
        , Validators.required),
      tag : new FormControl(
        ''
        , Validators.required)
    }
   )
  )

  ngOnInit():void{
    this
    .getByIdAnnounceUC
    .run(this.id)
    .then((curr)=>{
      console.warn(curr)
      this.form().setValue(
      {  
        remitente: curr.remitente,
        titulo: curr.titulo,
        descripcion:curr.descripcion,
        fechaEnvio: curr.fechaEnvio,
        tag       : curr.tag
      }
      )
      /* this.#state.set({
        value:curr
      }) */
    })
    
  }

  async onSubmit():Promise<void>{
    console.warn(
      `datos enviados: ${this.form().value}`
    )
    if(this.form().valid){

      await this.updateAnnounceUC
      .run(this.form().value, this.id)
      .then(()=>{
        this.router.navigate(['announcement'],);
      })

    
    }
   
  }
}
