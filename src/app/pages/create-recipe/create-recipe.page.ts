import { Component, OnInit } from '@angular/core';
import { recipeModel, ingredient, step } from 'src/app/models/recipeModel';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireStorage, createStorageRef } from '@angular/fire/compat/storage';


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

  constructor(private afStorage: AngularFireStorage) { }

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

}
