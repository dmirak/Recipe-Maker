import { Component, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-usernamepopup',
  templateUrl: './usernamepopup.component.html',
  styleUrls: ['./usernamepopup.component.scss'],
})
export class UsernamepopupComponent {
  username: string;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    @Inject('username') private usernameService: { username: string }
  ) {
    this.username = navParams.get('username') || '';
  }

  saveUsername() {
    this.usernameService.username = this.username;
    this.modalCtrl.dismiss();
  }
}