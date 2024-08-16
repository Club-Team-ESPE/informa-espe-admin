import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getAllDocumentUseCaseProvider } from './get-all-document.provider';
import { GetAllDocumentUseCase } from '../../../app/get-all-document.app';

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
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Document } from '../../../domain/document.entity';
import { routes } from '../../../../app/app.routes';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    RouterLink,
    TableModule, TagModule, ButtonModule,IconFieldModule, InputIconModule, 
    CommonModule, MultiSelectModule, InputTextModule, 
    DropdownModule, SliderModule, ProgressBarModule, ToolbarModule,
    DialogModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    ToastModule
  ],
  providers:[
    getAllDocumentUseCaseProvider,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {

  private getAllDocument = inject(GetAllDocumentUseCase) 

  public selectedDocument!: Document;

  public loading: boolean = true;

  public routes :any = routes;

  private confirmationService = inject(ConfirmationService)

  private messageService = inject(MessageService)

  public documents!: Document[];

  ngOnInit():void{
    this.getAllDocument
    .run()
    .then((resp)=> {
      this.loading = false
      this.documents = resp
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
