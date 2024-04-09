import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterListComponent } from './counter-list/counter-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
