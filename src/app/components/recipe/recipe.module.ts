import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecipeComponent } from './recipe.component'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [RecipeComponent],
  exports: [RecipeComponent]
})
export class RecipeComponentModule { }
