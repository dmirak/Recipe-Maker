import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, RefresherCustomEvent } from '@ionic/angular';
import { recipeModel } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public recipes: recipeModel[] = [];

  constructor(private db: AngularFirestore) {
    this.loadRecipes();
  }

  loadRecipes() {
    this.db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
      if (result)
        this.recipes = result;
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  deleteRecipe(id: string) {
    if (id) {
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
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}