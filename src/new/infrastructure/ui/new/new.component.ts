import { Component, inject } from '@angular/core';
import { GetAllNewUseCase } from '../../../app/get-all-new.app';
import { routes } from '../../../../app/app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { New } from '../../../domain/new.entity';
import { getAllNewUseCaseProvider } from './get-all-new.provider';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-new',
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
    getAllNewUseCaseProvider,
    //deleteAnnouncementUseCaseProvider,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  private getAllNew = inject(GetAllNewUseCase) 

  public selectedNew!: New;

  public loading: boolean = true;

  public routes :any = routes;

  private confirmationService = inject(ConfirmationService)

  private messageService = inject(MessageService)

  public news!: New[];

  ngOnInit():void{
    this.getAllNew
    .run()
    .then((resp)=> {
      this.loading = false
      this.news = resp
    })
  }

  confirmDelete(event: Event, id :number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            //this.deleteAnnouncement(id)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }
}
