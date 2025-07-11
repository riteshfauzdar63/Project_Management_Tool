import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from "./components/side-bar/side-bar";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'TaskManagementTool';
  
  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
