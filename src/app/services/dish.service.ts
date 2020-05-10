import { Injectable } from "@angular/core"; //make our service ingectible for dependency injection
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";

@Injectable({
  providedIn: "root",
})
export class DishService {
  constructor() {}

  getDishes(): Dish[]{
    return DISHES;
  }
}
