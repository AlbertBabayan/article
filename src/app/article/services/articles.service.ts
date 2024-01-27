import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArticleResponse } from '../interfaces/article-response.interface';
import { IArticle } from '../interfaces/article.interface';

@Injectable()

export class ArticlesService {

  private http = inject(HttpClient);

  constructor() {}

  public getArticle(payload: number): Observable<any> {
    const { serverUrl } = environment;
    return this.http.get<any>(`${serverUrl}/api/article/${payload}`);
  }

  public getArticles(): Observable<IArticleResponse> {
    const { serverUrl } = environment;
    return this.http.get<IArticleResponse>(`${serverUrl}/api/articles`);
  }

  public updateArticle(payload: Partial<IArticle>, articleId: number): Observable<any> {
    const { serverUrl } = environment;
    return this.http.put<any>(`${serverUrl}/api/article/edit/${articleId}`, payload);
  }

  public createArticle(payload: IArticle): Observable<any> {
    const { serverUrl } = environment;
    return this.http.post<any>(`${serverUrl}/api/article/create`, payload);
  }
}
