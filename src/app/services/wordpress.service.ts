import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Config from '../config';
import { Observable } from 'rxjs';
import {forkJoin} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(public http: HttpClient) { }

  getLastPosts(page: number = 1): Observable<any>  {
    return this.http.get(Config.WORDPRESS_REST_API_URL + 'posts?page=' + page);
  }

  getAuthor(author: any): Observable<any> {
    return this.http.get(Config.WORDPRESS_REST_API_URL + 'users/' + author);
  }

  getPostCategories(post: any): Observable<any>  {
    const observableBatch = [];

    post.categories.forEach((category: any) => {
      observableBatch.push(this.getCategory(category));
    });

    return forkJoin(observableBatch);
   }

  getCategory(category: any): Observable<any> {
    return this.http.get(Config.WORDPRESS_REST_API_URL + 'categories/' + category);
  }
}
