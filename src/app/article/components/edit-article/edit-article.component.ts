import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../../interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, OnDestroy {

  public currentArticle: IArticle;
  public currentArticleId: number;
  public articleForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private articlesSvc = inject(ArticlesService);
  private activeRoute = inject(ActivatedRoute);
  private destroy$ = new Subject();
  
  constructor() { }

  ngOnInit() {
    this.getArticleInit();
    this.formInit();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64: string = reader.result as string;
      this.articleForm.patchValue({ picture: base64 });
      this.articleForm.get('picture').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

  public updateArticle() {
    this.articlesSvc.updateArticle(this.articleForm.value, this.currentArticle.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      resp => this.currentArticle = resp
    )
  }

  private formInit() {
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      picture: ['', [Validators.required]],
    })
  }

  private getArticleInit() {
    this.activeRoute.data.subscribe(
      data => {
        this.currentArticle = data.article;
      });
  }
}
