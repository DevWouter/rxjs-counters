import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterApiService } from '../counter-api.service';
import { firstValueFrom, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-item.component.html',
  styleUrl: './counter-item.component.css'
})
export class CounterItemComponent {
  constructor(
    private readonly api: CounterApiService,
  ) { }


  @Input() counter?: string;
  @Output() deleted = new EventEmitter<void>();

  /** ERROR: This results in `/api/countes/undefined` */
  value$ = this.api.get(this.counter!).pipe(
    map(x => x.value)
  );

  deleteMe() {
    firstValueFrom(this.api.delete(this.counter!));
    this.deleted.emit(); // Emit that we have been deleted
  }
}
