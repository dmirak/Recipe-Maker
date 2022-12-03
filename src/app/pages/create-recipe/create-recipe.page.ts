import { Component, OnInit } from '@angular/core';
import { recipe } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
})
export class CreateRecipePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Happy now???');
  }

  formSubmit() {
    // const newRecipe: recipeModel = {

    // };
  }

}
