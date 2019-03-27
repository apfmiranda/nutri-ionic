import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

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
               public fire: AngularFireAuth) {}

  entrar() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( data => {
      console.log('Dadaos do login: ', data);

      this.users.email = this.email.value;
      this.users.senha = this.password.value;

      this.logadoComSucesso();
      this.navCtrl.navigateRoot('/dicas');
    })
    .catch((error: any) => {
      switch (error.code) {
        case 'auth/invalid-email':
        this.falhaNoLogin('E-mail inválido');
          break;
        case 'auth/user-disabled':
          this.falhaNoLogin('E-mail desativado');
          break;
        case 'auth/user-not-found':
          this.falhaNoLogin('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          this.falhaNoLogin('Credenciais inválidas');
          break;
        default:
          this.falhaNoLogin(error.message);
      }
    });
  }

  goToRegistrarUsuario() {
    this.navCtrl.navigateForward('/register');
  }
  goToRecuperarSenha() {
    this.navCtrl.navigateForward('/recuperar');
  }

  async logadoComSucesso() {
    const toast =  await this.toastCtrl.create({
      message: 'Logado com sucesso.',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'fechar',
      duration: 2000
    });
    toast.present();
  }

  async falhaNoLogin(error: string) {
    const toast =  await this.toastCtrl.create({
      message: 'Erro: ' + error,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'fechar',
      duration: 2000
    });
    toast.present();
  }

}
