import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router"; //to extract params from the url, activated route to have access to the current route
import { Location } from "@angular/common"; //to have the ability to go back and forward, it is a service

import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";


@Component({
  selector: "dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string [];
  prev: string;
  next: string;

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dishService.getDisgesIds().subscribe((dishIds) => this.dishIds = dishIds);
    //take one observable (params) and map it to another observable (dish service get dish)
    // that way users can modify the params to switch between dishes
    this.route.params.pipe(switchMap((params : Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id)
      });
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1)% this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index +1)% this.dishIds.length]
  }

  goBack(): void {
    this.location.back();
  }
}
