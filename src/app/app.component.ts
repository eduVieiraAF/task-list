import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <h1>Under construction</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'task-list';
}
