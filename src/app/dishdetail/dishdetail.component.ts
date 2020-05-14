import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router"; //to extract params from the url, activated route to have access to the current route
import { Location } from "@angular/common"; //to have the ability to go back and forward, it is a service
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { Comment } from "../shared/comment";

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
  commentForm: FormGroup;
  comment: Comment;
  
  formErrors = {
    author: "",
    rating: 5,
    comment: "",
  };

  validationMessages = {
    author: {
      required: "Author Name is required.",
      minlength: "Author Name must be at least 3 characters long.",
      maxlength: "Author Name cannot be more than 25 characters long.",
    },
    comment: {
      required: "Comment is required."
    },
  };




  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

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

    createForm() {
    this.commentForm = this.fb.group({
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      rating: 5,
      comment: ["", [Validators.required]]
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChange(data)
    );

    this.onValueChange(); //re(set) form validations
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();;
    let comments = this.dish.comments;
    comments.push(this.comment);
    this.dish.comments = comments;
    this.commentForm.reset({
      author: "",
      rating: 5,
      comment: ""
    });
  }

  onValueChange(data?: any) {
    // if the form has not been created yet
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error messages if any
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key] + " ";
            }
          }
        }
      }
    }
  }

}


