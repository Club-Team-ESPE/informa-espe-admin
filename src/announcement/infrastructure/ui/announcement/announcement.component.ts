import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { GetAllAnnouncementUseCase } from '../../../app/get-all-announcement-use-case';
import { getAllAnnouncementUseCaseProvider } from './get-all-announcement.provider';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { deleteAnnouncementUseCaseProvider } from './delete-announcement.provider';
import { DeleteAnnouncementUseCase } from '../../../app/delete-announcement-use-case';

import { Announcement } from '../../../domain/announcement.entity';

import { CommonModule, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { routes } from '../../../../app/app.routes';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { UpdateAnnouncementUseCase } from '../../../app/update-announcement-use-case';
import { updateAnnouncementUseCaseProvider } from '../update-announcement/update-announcement.provider';
import { getByIdAnnouncementUseCaseProvider } from '../update-announcement/get-by-id-announcement.provider';
import { GetByIdAnnouncementUseCase } from '../../../app/get-by-id-announcement-use-case';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    JsonPipe,
    TableModule, TagModule, ButtonModule,IconFieldModule, InputIconModule, 
    CommonModule, MultiSelectModule, InputTextModule, 
    DropdownModule, SliderModule, ProgressBarModule, ToolbarModule,
    DialogModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    ToastModule
  ],
  providers:[
    getAllAnnouncementUseCaseProvider,
    deleteAnnouncementUseCaseProvider,
    getByIdAnnouncementUseCaseProvider,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit{

  private getAllAnnouncementUC = inject(GetAllAnnouncementUseCase) 
  private deleteAnnouncementUC = inject(DeleteAnnouncementUseCase) 

  public announcements!: Announcement[];
  public selectedAnnouncement!: Announcement;

  public loading: boolean = true;

  public routes :any = routes;

  private confirmationService = inject(ConfirmationService)

  private messageService = inject(MessageService)
  constructor(){
    
  }
  ngOnInit(): void {
    this.getAllAnnouncementUC
    .run()
    .then((curr :Announcement[])=> {
      setTimeout(()=>{
        this.announcements = curr;
      this.loading = false;
    },2000)
      
    })
  }
  

  
  
  deleteAnnouncement(id :number):void{
    this
    .deleteAnnouncementUC
    .run(id)
    .then(value=> 
    {
      this.announcements = this.announcements.filter(curr=> curr.id!==id)
    })
  }

  //popup confirmation
  confirmDelete(event: Event, id :number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            this.deleteAnnouncement(id)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
  
}
