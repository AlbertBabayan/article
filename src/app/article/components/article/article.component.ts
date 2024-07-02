import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SharedModalComponent } from 'src/app/shared/components/modal/shared-modal.component';
import { IArticle } from '../../interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public currentArticlesList: IArticle[];
  public currentArticle: IArticle;
  private articlesSvc = inject(ArticlesService);
  private destroy$ = new Subject();
  private router = inject(Router);
  @ViewChild('SharedModalComponent') modalComponent: SharedModalComponent;

  constructor() { }

  ngOnInit() {
    this.getArticlesInit();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public openArticle(article: IArticle) {
    this.currentArticle = article;
    this.modalComponent.open();
  }

  public edit(id: number) {
    this.router.navigate(['edit-article', id]);
  }

  public create() {
    this.router.navigate(['create-article']);
  }

  private getArticlesInit() {
    this.articlesSvc.getArticles().pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      resp => {
        this.currentArticlesList = resp.result;
      }
    )
  }
}
