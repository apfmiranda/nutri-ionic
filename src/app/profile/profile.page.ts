import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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

}
