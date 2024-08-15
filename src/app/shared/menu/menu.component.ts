import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Badge, BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';


const menuItems = [
    {
        separator: true
    },
    {
        label: 'Documents',
        route:'/document',
        icon:'pi pi-file-pdf'
    },
    {
        label: 'Annoucements',
        route:'/announcement',
        icon:'pi pi-megaphone'
    },
    {
        separator: true
    }
];

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    MenuModule,
    ButtonModule,
    BadgeModule,
    AvatarModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = menuItems;
    }

}
