import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, private platform: Platform) {
    this.checkForUpdates();
  }

  async checkForUpdates(): Promise<void> {
    if (await this.swUpdate.checkForUpdate()) {
      console.log('New version found');
      if (confirm('A new version is available. Load it?')) {
        try {
          await this.swUpdate.activateUpdate();
          confirm('New version activated!');
          window.location.reload();
        } catch {
          console.log('Failed to activate new version');
        }
      }
    } else {
      console.log('No new version found');
    }
  }
}
