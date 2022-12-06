import { Component, OnInit } from '@angular/core';
import { recipeModel, ingredient, step } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
})
export class CreateRecipePage implements OnInit {

  public title = '';
  public user = localStorage.getItem('userName') ?? '';
  public cookTime = 0;
  public imageLink = '';
  public ingredientList: ingredient[] = [];
  public stepList: step[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Happy now???');
  }

  formSubmit() {
    const newRecipe: recipeModel = {
      'title': this.title,
      'user': this.user,
      'cookTime': this.cookTime,
      'imageLink': this.imageLink,
      'ingredientList': this.ingredientList,
      'stepList': this.stepList
    };
  }

}
