import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {

  email: string;
  fotoPerfil: boolean = false;

  facebook = {
    nome: '',
    fotoUrl: ''
  };

  constructor(public navCtrl: NavController,
              public fire: AngularFireAuth) {

    this.email = fire.auth.currentUser.email;
    this.facebook.nome = fire.auth.currentUser.displayName;
    this.facebook.fotoUrl = fire.auth.currentUser.photoURL;

    if (this.facebook.fotoUrl == null) {
      this.fotoPerfil = false;
    } else {
      this.fotoPerfil = true;
    }
  }

  ngOnInit() {
  }

  logout() {
    this.fire.auth.signOut();
    this.navCtrl.navigateRoot('');
  }

}
