import { Component } from '@angular/core';
import { CounterItemComponent } from '../counter-item/counter-item.component';

@Component({
  selector: 'app-counter-list',
  standalone: true,
  imports: [CounterItemComponent],
  templateUrl: './counter-list.component.html',
  styleUrl: './counter-list.component.css'
})
export class CounterListComponent {
  

}
