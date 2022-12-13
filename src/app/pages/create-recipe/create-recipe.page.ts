import { Component } from '@angular/core';
import { recipeModel, ingredient, step } from 'src/app/models/recipeModel';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ItemReorderEventDetail } from '@ionic/angular';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
})
export class CreateRecipePage {

  public title = '';
  public user = localStorage.getItem('userName') ?? 'TempUser';
  public cookTime = 0;
  public imageLink = '';
  public ingredientList: ingredient[] = [];
  public stepList: step[] = [];
  public photo?: Photo;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router) { }

  async formSubmit() {
    this.photo !== undefined ?
      await this.savePicture(this.photo) :
      null;

    const newRecipe: recipeModel = {
      'id': '0',
      'title': this.title,
      'user': this.user,
      'cookTime': this.cookTime,
      'imageLink': this.imageLink,
      'ingredientList': this.ingredientList,
      'stepList': this.stepList
    };

    this.db.collection<recipeModel>('/recipes').add(newRecipe).then((recipe: DocumentReference<recipeModel>) => {
      recipe.update({
        'id': recipe.id
      }).then(() => {
        this.router.navigate(['/']);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  async takePicture() {
    this.photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  }

  async savePicture(photo: Photo) {
    // Taken from https://github.com/VictorNorman/cs336-pwa-example
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const { v4: uuidv4 } = require('uuid');
    this.imageLink = uuidv4() + '.jpeg';
    const ref = this.storage.ref(this.imageLink);
    ref.put(blob);
  }

  addIngredient() {
    this.ingredientList.push({
      'name': '',
      'quantity': ''
    });
  }

  addStep() {
    const { v4: uuidv4 } = require('uuid');
    this.stepList.push({
      'id': uuidv4(),
      'sequence': this.stepList.length + 1,
      'body': ''
    });
  }

  reorderSteps(e: CustomEvent<ItemReorderEventDetail>) {
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

  deleteIngredient(index: number) {
    this.ingredientList.splice(index, 1);
  }

  deleteStep(index: number) {
    this.stepList.splice(index, 1);
    for (let i = index; i < this.stepList.length; i++) {
      this.stepList[i].sequence--;
    }
  }
}