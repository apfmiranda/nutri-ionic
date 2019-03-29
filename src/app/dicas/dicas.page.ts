import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators'
import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {

  posts: Array<any> = new Array<any>();
  isLoading = false;

  constructor(public navCtrl: NavController,
              public wpService: WordpressService,
              protected loading: LoadingService,
              public fire: AngularFireAuth) {}

  logout() {
    this.fire.auth.signOut();
    this.navCtrl.navigateRoot('');
  }

  ngOnInit() {}

  async ionViewWillEnter() {

    if (!(this.posts.length > 0)) {
      await this.loading.present('DicasPage.ionViewWillEnter', 'Loading posts...');

      this.wpService.getLastPosts().subscribe((response) => {

        for (let post of response) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<]';
          this.posts.push(post);
        }
        this.loading.dismiss('DicasPage.ionViewWillEnter');

      });
    }
  }

  goToPost(event, post) {
    this.navCtrl.navigateForward('post');
  }

}
