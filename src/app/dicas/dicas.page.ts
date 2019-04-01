import { IonInfiniteScroll } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { Post } from '../post/post.model';


@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  posts: Array<Post> = new Array<Post>();
  isLoading = false;


  constructor(private router: Router,
              public wpService: WordpressService,
              protected loading: LoadingService,
              public fire: AngularFireAuth) {}

  logout() {
    this.fire.auth.signOut();
    this.router.navigate(['/home']);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.loadLastPosts();
  }

  private async loadLastPosts() {
    if (!(this.posts.length > 0)) {
      await this.loading.present('DicasPage.ionViewWillEnter', 'Carregando posts...');
      this.wpService.getLastPosts().subscribe((newPosts) => {

        newPosts.forEach(onePost => {
          onePost.excerpt.rendered = onePost.excerpt.rendered.split('<a')[0];
          this.posts.push(onePost);
        });

        this.loading.dismiss('DicasPage.ionViewWillEnter');
      });
    }
  }

  async loadMoreData(event) {
    const page = (Math.ceil(this.posts.length / 10) + 1);

    this.wpService.getLastPosts(page).subscribe((newPosts) => {

      for (const post of newPosts) {
        if (this.isLoading) {
          event.target.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0];
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

  goToPost(post: any) {
    this.router.navigate(['/tabs/post', {id: post.id}]);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
