import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArticleResponse } from '../interfaces/article-response.interface';
import { IArticle } from '../interfaces/article.interface';

@Injectable()

export class ArticlesService {

  public serverUrl = environment.serverUrl;
  private http = inject(HttpClient);

  constructor() {}

  public getArticle(payload: number): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/api/article/${payload}`);
  }

  public getArticles(): Observable<IArticleResponse> {
    return this.http.get<IArticleResponse>(`${this.serverUrl}/api/articles`);
  }

  public updateArticle(payload: Partial<IArticle>, articleId: number): Observable<any> {
    return this.http.put<any>(`${this.serverUrl}/api/article/edit/${articleId}`, payload);
  }

  public createArticle(payload: IArticle): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/api/article/create`, payload);
  }
}
