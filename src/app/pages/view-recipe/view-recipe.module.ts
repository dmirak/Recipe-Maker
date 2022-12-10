import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRecipePage } from './view-recipe.page';

import { IonicModule } from '@ionic/angular';

import { ViewRecipePageRoutingModule } from './view-recipe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRecipePageRoutingModule
  ],
  declarations: [ViewRecipePage]
})
export class ViewRecipePageModule { }
