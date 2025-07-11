import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
   isCollapsed = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
  this.sidebarToggle.emit(this.isCollapsed);
}
}
