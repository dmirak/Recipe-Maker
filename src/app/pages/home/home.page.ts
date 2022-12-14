import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RefresherCustomEvent, PopoverController, IonPopover } from '@ionic/angular';
import { recipeModel } from 'src/app/models/recipeModel';
import { Router } from '@angular/router';
import { UsernamepopupComponent } from 'src/app/components/usernamepopup/usernamepopup.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('usernamePopover', { static: false }) usernamePopover!: IonPopover;
  
  public recipes: recipeModel[] = [];
localStorage: any;
  popover!: HTMLIonPopoverElement;

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