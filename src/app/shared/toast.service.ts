import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  async show(mensagem: string) {
    const toast =  await this.toastCtrl.create({
      message: mensagem,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'fechar',
      duration: 5000
    });
    toast.present();
  }

}
