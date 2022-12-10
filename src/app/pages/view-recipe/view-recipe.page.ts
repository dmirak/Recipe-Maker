import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

import { recipeModel } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage {
  public recipe: recipeModel | undefined;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute
  ) {
    const recipeId = this.route.snapshot.queryParamMap.get('recipeId');
    console.log('recipeId', recipeId);
    db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
      if (result) {
        this.recipe = result.find(recipe => recipe.id === recipeId);
      }
    });
  }
}
