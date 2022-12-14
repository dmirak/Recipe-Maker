import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RefresherCustomEvent } from '@ionic/angular';
import { recipeModel } from 'src/app/models/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public recipes: recipeModel[] = [];
  public user = localStorage.getItem('userName');

  constructor(private db: AngularFirestore, private router: Router) {
    db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
      if (result)
        this.recipes = result;
    });
  }

  loadRecipes() {
    this.db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
      if (result)
        this.recipes = result;
    });
  }

  viewRecipe(recipeId: string) {
    this.router.navigate(['/view-recipe'], { queryParams: { recipeId } });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  deleteRecipe(id: string) {
    if (id) {
      // This will check to see if your username matches the user on the recipe
      // before deleting. Didn't have time to make sure this was working correctly
      // this.db.doc<recipeModel>('recipes/' + id).get().subscribe((recipe) => {
      //   if (localStorage.getItem('userName') === recipe.data()?.user) {
      //     this.db.doc<recipeModel>('recipes/' + id).delete().then(() => {
      //       this.loadRecipes();
      //     }).catch((error) => {
      //       console.log(error);
      //     });
      //   }
      // }, (error) => {
      //   console.log(error);
      // }

      this.db.doc<recipeModel>('recipes/' + id).delete().then(() => {
        this.loadRecipes();
        this.router.navigate(['/']);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}