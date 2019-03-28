import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {

  constructor(public navCtrl: NavController,
              public fire: AngularFireAuth) {}

  logout() {
    this.fire.auth.signOut();
    this.navCtrl.navigateRoot('');
  }

  ngOnInit() {
  }

}
