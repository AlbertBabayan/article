import { Component, inject, OnInit } from '@angular/core';
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
export class EditArticleComponent implements OnInit {

  public article: IArticle;
  public currentArticleId: number;
  public previewImage: string;
  public articleForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private articlesSvc = inject(ArticlesService);
  private activeRoute = inject(ActivatedRoute);
  private destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.currentArticleId = params.id;
    })
    this.articlesSvc.getArticle(this.currentArticleId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      resp => {
        this.article = resp
      }
    )
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    })
  }

  public onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64: string = reader.result as string;
      this.previewImage = base64;
    };
    reader.readAsDataURL(file);
  }

  public updateArticle() {
    const updatedArticle = {
      ...this.articleForm.value,
      picture: this.previewImage,
    }
    this.articlesSvc.updateArticle(updatedArticle, this.article.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      resp => this.article = resp
    )
  }
}
