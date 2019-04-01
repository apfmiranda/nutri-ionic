import { ToastService } from './../shared/toast.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export class Users{
  email: string;
  senha: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: Users = new Users();

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor (public navCtrl: NavController,
               public toastCtrl: ToastController,
               public toast: ToastService,
               public fire: AngularFireAuth) {}

  entrar() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( data => {
      this.users.email = this.email.value;
      this.users.senha = this.password.value;

      this.toast.show('Logado com sucesso');
      this.navCtrl.navigateRoot('/tabs/dicas');
    })
    .catch((error: any) => {
      switch (error.code) {
        case 'auth/invalid-email':
        this.toast.show('E-mail inválido');
          break;
        case 'auth/user-disabled':
          this.toast.show('E-mail desativado');
          break;
        case 'auth/user-not-found':
          this.toast.show('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          this.toast.show('Credenciais inválidas');
          break;
        default:
          this.toast.show(error.message);
      }
    });
  }

  loginWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(data => {
      this.navCtrl.navigateRoot('/tabs/dicas');
    })
    .catch((error: any) => {
      this.toast.show(error.message);
    });
  }

  loginVisitante() {
    this.fire.auth.signInAnonymously()
    .then(data => {
      this.navCtrl.navigateRoot('/tabs/dicas');
      this.toast.show('Logado com sucesso');
    })
    .catch((error: any) => {
      this.toast.show(error.message);
    });
  }

  goToRegistrarUsuario() {
    this.navCtrl.navigateForward('/register');
  }
  goToRecuperarSenha() {
    this.navCtrl.navigateForward('/recuperar');
  }

}
