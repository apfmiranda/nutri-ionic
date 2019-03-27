import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor (public navCtrl: NavController,
               public toastCtrl: ToastController,
               public fire: AngularFireAuth) {}

  ngOnInit() {
  }

  registrar() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log('Aque temos os dados: ', data);
      this.registradoComSucesso();
      this.navCtrl.navigateRoot('/dicas');
    })
    .catch((error: any) => {

      switch (error.code) {
        case 'auth/email-already-in-use':
          this.falhaNoCadastro('O e-mail já está em uso');
          break;
        case 'auth/invalid-email':
          this.falhaNoCadastro('E-mail inválido');
          break;
        case 'auth/operation-not-allowed':
          this.falhaNoCadastro('Não esta habilitado a criar usuarios');
          break;
        case 'auth/weak-password':
          this.falhaNoCadastro('Senha não é forte o suficiente');
          break;
        default:
          this.falhaNoCadastro(error.message);
      }
    });
  }

  async registradoComSucesso() {
    const toast =  await this.toastCtrl.create({
      message: 'Usuario criado com sucesso.',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'fechar',
      duration: 2000
    });
    toast.present();
  }

  async falhaNoCadastro(erro: string) {
    const toast =  await this.toastCtrl.create({
      message: 'Erro: .' + erro,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'fechar',
      duration: 2000
    });
    toast.present();
  }

}
