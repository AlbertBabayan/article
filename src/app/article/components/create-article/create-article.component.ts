import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../../interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  public createArticleForm: FormGroup;
  private articleService = inject(ArticlesService);
  private formBuilder = inject(FormBuilder);
  private destroy$ = new Subject();

  ngOnInit() {
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
      this.createArticleForm.patchValue({ picture: base64 });
      this.createArticleForm.get('picture').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

  public createArticle() {
    this.articleService.createArticle(this.createArticleForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }

  private formInit() {
    this.createArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      picture: ['', [Validators.required]],
    });
  }
}
