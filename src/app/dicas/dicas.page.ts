import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { from, Subscription } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators'
import { LoadingService } from '../services/loading.service';
import { Router, NavigationStart } from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  posts: Array<any> = new Array<any>();
  isLoading = false;
  browserRefresh = true;


  constructor(private router: Router,
              public wpService: WordpressService,
              protected loading: LoadingService,
              public fire: AngularFireAuth) {}

  logout() {
    this.fire.auth.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
  }

  async ionViewWillEnter() {
    await this.loadLastPosts();
  }

  private async loadLastPosts() {
    if (!(this.posts.length > 0)) {
      await this.loading.present('DicasPage.ionViewWillEnter', 'Carregando posts...');
      this.wpService.getLastPosts().subscribe((response) => {
        for (const post of response) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<]';
          this.posts.push(post);
        }
        this.loading.dismiss('DicasPage.ionViewWillEnter');
      });
    }
  }

  async loadMoreData(event) {
    const page = (Math.ceil(this.posts.length / 10) + 1);

    this.wpService.getLastPosts(page).subscribe((response) => {

      for (const post of response) {
        if (this.isLoading) {
          event.target.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<]';
        this.posts.push(post);
        this.isLoading = false;
        this.toggleInfiniteScroll();
      }
    }, error => {
      this.toggleInfiniteScroll();
    });
  }

  async doRefresh(event) {
    this.router.navigate([this.router.url]);

    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }

  goToPost(event, post) {
    this.router.navigate(['/post']);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
