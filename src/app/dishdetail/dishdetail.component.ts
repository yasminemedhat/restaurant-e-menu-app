import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router"; //to extract params from the url, activated route to have access to the current route
import { Location } from "@angular/common"; //to have the baility to go back and forward, it is a service

import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

@Component({
  selector: "dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.dishService.getDish(id)
      .then((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }
}
