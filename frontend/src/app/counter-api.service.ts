import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, switchMap  } from 'rxjs';

export interface Counter {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class CounterApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  /**
   * Using a BehaviorSubject to trigger a reload of all the requests. We do this in the service so that all views are updated.
   * This is a **TERRIBLE** idea unless you layer the service.
   */
  private reload$ = new BehaviorSubject(null);


  all() : Observable<string[]> {
    return this.reload$.pipe(
      switchMap(()=> this.httpClient.get<string[]>('/api/counters'))
    );
  }

  create(name: string) :Observable<never> {
    return this.httpClient.post<never>('/api/counters', { name })
    .pipe(finalize(() => this.reload$.next(null)));
  }

  get(name:string): Observable<Counter> {
    return this.httpClient.get<Counter>('/api/counters/' + name);
  }

  delete(name:string): Observable<number> {
    return this.httpClient.delete<number>('/api/counters/' + name)
    .pipe(finalize(() => this.reload$.next(null)))
  }

  update(name:string, value:number) {
    return this.httpClient.put('/api/counters/' + name, {value})
    .pipe(finalize(() => this.reload$.next(null)))
  }
}
