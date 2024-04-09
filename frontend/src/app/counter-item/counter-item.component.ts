import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterApiService } from '../counter-api.service';
import { BehaviorSubject, filter, firstValueFrom, map, switchMap, timer, combineLatest, debounceTime } from 'rxjs';
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

  private timer$ = timer(0, 5000); // Trigger every 5 seconds
  private reload$ = new BehaviorSubject(null);

  // Convert the input value from a string to a BehaviorSubject
  private _counter = new BehaviorSubject<string | undefined>(undefined);
  @Input() set counter(value: string | undefined) { this._counter.next(value); }
  get counter() { return this._counter.value; }

  @Output() deleted = new EventEmitter<void>();

  value$ = combineLatest([this.reload$, this.timer$]).pipe(
    switchMap(()=>this._counter),     // Get the counter name
    filter(x=> x !== undefined),      // Don't emit unless name is set
    switchMap(x => this.api.get(x!)), // Then get value from API
    map(x => x.value)                 // And return only the value
  );

  deleteMe() {
    firstValueFrom(this.api.delete(this.counter!));
    this.deleted.emit(); // Emit that we have been deleted
  }

  async increment() {
    var v = await firstValueFrom(this.value$);
    await firstValueFrom(this.api.update(this.counter!, v + 1));
    this.reload$.next(null);
  }
  
  async decrement() {
    var v = await firstValueFrom(this.value$);
    await firstValueFrom(this.api.update(this.counter!, v - 1));
    this.reload$.next(null);
  }
}
