import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../article/interfaces/article.interface';
import { ArticlesService } from '../article/services/articles.service';


@Injectable({
  providedIn: 'root'
})

export class ArticleResolver implements Resolve<IArticle> {
  articlesService: ArticlesService = inject(ArticlesService);
  resolve(route: ActivatedRouteSnapshot): Observable<IArticle> {
    const articleId = +route.paramMap.get('id');
    return this.articlesService.getArticle(articleId);
  }
}
