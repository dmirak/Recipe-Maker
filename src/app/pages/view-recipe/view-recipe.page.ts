import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { recipeModel } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})

export class ViewRecipePage {
  public recipe?: recipeModel;
  public imageUrl?: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
    const recipeId = this.route.snapshot.queryParamMap.get('recipeId');
    db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
      if (result) {
        this.recipe = result.find(recipe => recipe.id === recipeId);
        if (this.recipe?.imageLink) {
          const ref = this.storage.ref(this.recipe?.imageLink!);
          this.imageUrl = ref.getDownloadURL();
        }
      }
    });
  }
}