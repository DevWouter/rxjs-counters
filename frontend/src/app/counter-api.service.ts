import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Counter {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class CounterApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  all() : Observable<string[]> {
    return this.httpClient.get<string[]>('/api/counters');
  }

  create(name: string) :Observable<never> {
    return this.httpClient.post<never>('/api/counters', { name });
  }

  get(name:string): Observable<Counter> {
    return this.httpClient.get<Counter>('/api/counters/' + name);
  }

  delete(name:string): Observable<number> {
    return this.httpClient.delete<number>('/api/counters/' + name);
  }

  update(name:string, value:number) {
    return this.httpClient.put('/api/counters/' + name, {value});
  }
}
