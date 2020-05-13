import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  constructor() {}

  getLeaders(): Observable<Leader[]> {
    // Simulate server latency
    // of will return an observable that will emit anything in a single emission then we convert it into a Observable
    //  to mimic an HTTP request
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    // Simulate server latency
    return of(LEADERS.filter((Leader) => Leader.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    // Simulate server latency
    return of(LEADERS.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
  }
}
