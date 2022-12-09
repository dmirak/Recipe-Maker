import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService, Message } from '../../services/data.service';

// How to get and display image from Firebase Storage:
// 1. Make public Observable<string>
//  public imageUrl?: Observable<string>;
// 2. Get reference to image:
//  const ref = this.storage.ref(imageLink);
// 3. call getDownloadURL() on ref
//  this.imageUrl = ref.getDownloadURL();
// 4. Display imageUrl with the async pipe
//  <ion-img [src]="imageUrl | async" />

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService) { }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

}
