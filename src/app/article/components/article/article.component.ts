import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
export class ArticleComponent implements OnInit {

  public articles: IArticle[];
  public article: IArticle;
  private articlesSvc = inject(ArticlesService);
  private destroy$ = new Subject();
  private router = inject(Router);
  @ViewChild('modal', {static: false}) modalComponent: SharedModalComponent;

  constructor() { }

  ngOnInit() {
    this.articlesSvc.getArticles().pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      resp => {
        this.articles = resp.result;
      }
    )
  }

  openArticle(article: IArticle) {
    this.article = article;
    this.modalComponent.open();
  }

  edit(id: number) {
    this.router.navigate(['edit-article', id]);
  }

  create() {
    this.router.navigate(['create-article']);
  }
}
