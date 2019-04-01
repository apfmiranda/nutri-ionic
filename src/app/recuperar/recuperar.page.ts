import { AngularFireAuth } from 'angularfire2/auth';
import { NavController} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  @ViewChild('email') emailDigitado;

  constructor (public navCtrl: NavController,
               public toast: ToastService,
               public fire: AngularFireAuth) {}

  ngOnInit() {
  }

  recuperar() {
    this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(() => {
      this.toast.show('Solicitação enviada por email');
      this.navCtrl.navigateForward('/home');
    })
    .catch((error: any) => {
      switch (error.code) {
        case 'auth/invalid-email':
        this.toast.show('E-mail inválido');
          break;
        case 'auth/user-not-found':
          this.toast.show('Usuário não encontrado');
          break;
        default:
          this.toast.show(error.message);
      }
    });
  }
}
