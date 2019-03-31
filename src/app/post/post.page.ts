import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { LoadingService } from '../services/loading.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {forkJoin} from 'rxjs';
import { Post } from './post.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  post:       Post;
  autor:      string;
  categories: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute,
              private wpService: WordpressService,
              protected loading: LoadingService,
              public fire: AngularFireAuth) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.loading.present('PostPage.ionViewWillEnter', 'Carregando post...');
    const id = this.route.snapshot.paramMap.get('id');

    if (this.post === undefined) {
      this.getPost(id).subscribe(result => {
        this.post = result;
        if (this.post !== undefined && this.autor === undefined) {
          this.getAuthor(this.post.author).subscribe(autor => {
            this.autor = autor.name;
          });
        }
        if (this.post !== undefined && this.autor === undefined) {
          this.getCategories(this.post).subscribe(cats => {
            this.categories = cats;
          });
        }
      });
    }
    this.loading.dismiss('PostPage.ionViewWillEnter');
  }

  getPost(id: any) {
    return this.wpService.getPost(id);
  }

  getAuthor(id: number) {
    return this.wpService.getAuthor(this.post.author);
  }

  getCategories(post: Post) {
    return this.wpService.getPostCategories(post);
  }

}
