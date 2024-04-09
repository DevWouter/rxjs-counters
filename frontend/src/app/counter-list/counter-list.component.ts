import { Component } from '@angular/core';
import { CounterItemComponent } from '../counter-item/counter-item.component';
import { CounterApiService } from '../counter-api.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
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

  counters$ = this.api.all();


  async addCounter() {
    var name = this.createForm.value.name ?? "";
    /**
     * OPTION 1: Subscribe
     * - Acceptable because this rxjs will emit either one value or one error and then closes.
     * - Dangerous because it's easy to forget to invoke "subscribe()"
     * - Dangerous because it won't throw an error if the observable gets in an error state.
     * - Troublesome if you are checking all you "subscribe()" in your code.
     */
    // this.api.create(name).subscribe();
    
    /**
     * OPTION 2: Make it a promise
     * - Converts it to a promise and waits until the first value is emitted.
     * - Promise makes it clear that we expect only one value.
     * - Promise will throw an error if the observable gets in an error state.
     */
    await firstValueFrom(this.api.create(name));

    this.createForm.reset({name: ''});
  }

}
