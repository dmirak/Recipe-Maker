import { Component, ChangeDetectorRef } from '@angular/core';
import { recipeModel, ingredient, step } from 'src/app/models/recipeModel';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireStorage, createStorageRef } from '@angular/fire/compat/storage';
import { ItemReorderEventDetail } from '@ionic/angular';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
})
export class CreateRecipePage {

  public title = '';
  public user = localStorage.getItem('userName') ?? '';
  public cookTime = 0;
  public imageLink = '';
  public ingredientList: ingredient[] = [];
  public stepList: step[] = [];

  public from = 0;
  public to = 0;

  constructor(private afStorage: AngularFireStorage) { }

  formSubmit() {
    const newRecipe: recipeModel = {
      'title': this.title,
      'user': this.user,
      'cookTime': this.cookTime,
      'imageLink': this.imageLink,
      'ingredientList': this.ingredientList,
      'stepList': this.stepList
    };

    console.log(this.ingredientList);
  }

  async takePicture() {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // Taken from https://github.com/VictorNorman/cs336-pwa-example
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const { v4: uuidv4 } = require('uuid');
    this.imageLink = uuidv4() + '.jpeg';
    console.log(this.imageLink);
    const storageRef = this.afStorage.ref(this.imageLink);
    storageRef.put(blob);
  }

  addIngredient() {
    this.ingredientList.push({
      'name': '',
      'quantity': ''
    });
  }

  addStep() {
    this.stepList.push({
      'sequence': this.stepList.length + 1,
      'body': ''
    });
  }

  reorderSteps(e: CustomEvent<ItemReorderEventDetail>) {
    this.from = e.detail.from;
    this.to = e.detail.to;
    for (let i = Math.min(e.detail.from, e.detail.to); i <= Math.max(e.detail.from, e.detail.to); i++) {
      this.stepList[i].sequence === e.detail.from + 1 ?
        this.stepList[i].sequence = e.detail.to + 1 :
        this.stepList[i].sequence < e.detail.from + 1 ?
          this.stepList[i].sequence++ :
          this.stepList[i].sequence--
    }
    this.stepList.sort((a, b) => a.sequence > b.sequence ? 1 : -1);
    e.detail.complete();
  }

}
