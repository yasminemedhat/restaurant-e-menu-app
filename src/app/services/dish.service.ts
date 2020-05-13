import { Injectable } from "@angular/core"; //make our service ingectible for dependency injection
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: "root",
})
export class DishService {
  constructor() {}

  getDishes(): Observable<Dish[]> {
    // Simulate server latency
    // of will return an observable that will emit anything in a single emission then we convert it into a Observable
    //  to mimic an HTTP request as HTTP return observables
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    // Simulate server latency
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    // Simulate server latency
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDisgesIds(): Observable<string []>{
    return of(DISHES.map(dish=> dish.id));
  }
}
