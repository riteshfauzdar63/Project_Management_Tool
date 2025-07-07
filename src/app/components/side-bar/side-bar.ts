import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, MatSidenavModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  opened = true;

  toggleSidebar(): void {
    this.opened = !this.opened;
  }
}
