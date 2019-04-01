import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {

    const authObserver = this.afAuth.authState.subscribe(users => {
      if (users) {
        this.navCtrl.navigateRoot('/tabs/dicas');
        authObserver.unsubscribe();
      } else {
        this.navCtrl.navigateRoot('');
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
