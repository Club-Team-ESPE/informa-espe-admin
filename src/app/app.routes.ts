import { Routes } from '@angular/router';
import { DocumentComponent } from '../document/infrastructure/ui/document/document.component';
import { AnnouncementComponent } from '../announcement/infrastructure/ui/announcement/announcement.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AddDocumentComponent } from '../document/infrastructure/ui/add-document/add-document.component';
import { AddAnnouncementComponent } from '../announcement/infrastructure/ui/add-announcement/add-announcement.component';
import { UpdateAnnouncementComponent } from '../announcement/infrastructure/ui/update-announcement/update-announcement.component';
import { NewComponent } from '../new/infrastructure/ui/new/new.component';
import { AddNewComponent } from '../new/infrastructure/ui/add-new/add-new.component';

export const routes: Routes = [
{
  path:'',
  component: MenuComponent,
  children: [  
    {
      path:'document',
      component:DocumentComponent,
      
    },
    {
      path:'add-document',
      component: AddDocumentComponent
    },
    {
      path:'announcement',
      component: AnnouncementComponent
    },
    {
      path:'add-announcement',
      component: AddAnnouncementComponent
    },
    {
      path:'update-announcement/:id',
      component: UpdateAnnouncementComponent
    },
    {
      path:'new',
      component: NewComponent
    },
    {
      path:'add-new',
      component: AddNewComponent
    }
    
  ]
},
/* {
  path:'**',
  component:DocumentComponent,
} */

];
