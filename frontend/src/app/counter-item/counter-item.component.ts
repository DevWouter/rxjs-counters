import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-item',
  standalone: true,
  imports: [],
  templateUrl: './counter-item.component.html',
  styleUrl: './counter-item.component.css'
})
export class CounterItemComponent {
  @Input() counter?: string;

}
