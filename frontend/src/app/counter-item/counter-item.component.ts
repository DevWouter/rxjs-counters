import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterApiService } from '../counter-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-counter-item',
  standalone: true,
  imports: [],
  templateUrl: './counter-item.component.html',
  styleUrl: './counter-item.component.css'
})
export class CounterItemComponent {
  constructor(
    private readonly api: CounterApiService,
  ) { }

  @Input() counter?: string;
  @Output() deleted = new EventEmitter<void>();

  deleteMe() {
    firstValueFrom(this.api.delete(this.counter!));
    this.deleted.emit(); // Emit that we have been deleted
  }
}
