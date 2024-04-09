import { Component } from '@angular/core';
import { CounterItemComponent } from '../counter-item/counter-item.component';
import { CounterApiService } from '../counter-api.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, firstValueFrom, switchMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-counter-list',
  standalone: true,
  imports: [CounterItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './counter-list.component.html',
  styleUrl: './counter-list.component.css'
})
export class CounterListComponent {
  constructor(
    private readonly api: CounterApiService,
    private readonly fb: FormBuilder,
  ) { }

  createForm = this.fb.group({
    name: this.fb.control('', {
      nonNullable: true, 
      validators: [
        Validators.required,
        Validators.minLength(1),
      ]}),
  });

  /** Same as before but now in the view instead of the service */
  private reload$ = new BehaviorSubject(null);
  counters$ = this.reload$.pipe(switchMap(()=>this.api.all()));

  async addCounter() {
    var name = this.createForm.value.name ?? "";
    await firstValueFrom(this.api.create(name));
    this.reload();
    this.createForm.reset({name: ''});
  }

  /** Function so that we can emit */
  reload(){
    this.reload$.next(null);
  }

}
