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
localStorage: any;

  constructor(private db: AngularFirestore, private router: Router) {
    db.collection<recipeModel>('/recipes').valueChanges().subscribe(result => {
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
}
