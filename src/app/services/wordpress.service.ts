import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Config from '../config';
import { Observable } from 'rxjs';
import {forkJoin} from 'rxjs';
import { Post } from '../post/post.model';


@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(public http: HttpClient) {}

  getLastPosts(page: number = 1): Observable<Post[]>  {
    return this.http.get<Post[]>(Config.WORDPRESS_REST_API_URL + 'posts?page=' + page);
  }

  getAuthor(author: number): Observable<any> {
    return this.http.get(Config.WORDPRESS_REST_API_URL + 'users/' + author);
  }

  getPostCategories(post: Post): Observable<any>  {
    const observableBatch = [];

    let categories: Array<any> = new Array<any>();
    categories = post.categories;

    for (let index = 0; index < categories.length; index++) {
      if (categories[index] !== ',') {
        observableBatch.push(this.getCategory(categories[index]));
      }
    }

    return forkJoin(observableBatch);
  }

  private getCategory(category: any): Observable<any> {
    return this.http.get(Config.WORDPRESS_REST_API_URL + 'categories/' + category);
  }

  getPost(id: any): Observable<Post> {
    return this.http.get<Post>(Config.WORDPRESS_REST_API_URL + 'posts/' + id);
  }


}
