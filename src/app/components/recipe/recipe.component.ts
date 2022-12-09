import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { recipeModel } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input() recipe?: recipeModel;

  public imageUrl?: Observable<string>;
  public ingredientCount = 0;
  public stepCount = 0;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.ingredientCount = this.recipe!.ingredientList.length;
    this.stepCount = this.recipe!.stepList.length;

    if (this.recipe?.imageLink) {
      const ref = this.storage.ref(this.recipe?.imageLink!);
      this.imageUrl = ref.getDownloadURL();
    }
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
