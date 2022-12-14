import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { RecipeComponentModule } from '../../components/recipe/recipe.module';
import { UsernamepopupComponentModule } from "../../components/usernamepopup/usernamepopup.module";
import { UsernamepopupComponent } from 'src/app/components/usernamepopup/usernamepopup.component';

@NgModule({
    declarations: [HomePage, UsernamepopupComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RecipeComponentModule,
        HomePageRoutingModule,
        UsernamepopupComponentModule
    ]
})
export class HomePageModule { }