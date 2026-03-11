import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isHovered = false;
  protected readonly title = 'Zenika Shop'; //signal('zenika-ng-website');

  toggleIsHovered($event: any): void {
    console.log($event);
    this.isHovered = !this.isHovered;
  }
}
