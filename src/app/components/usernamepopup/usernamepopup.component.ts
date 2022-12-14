import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usernamepopup',
  templateUrl: './usernamepopup.component.html',
  styleUrls: ['./usernamepopup.component.scss'],
})
export class UsernamepopupComponent{
  username!: string;
  usernameSaved = false;

  saveUsername() {
    localStorage.setItem('userName', this.username);
    this.usernameSaved = true;
  }
}