import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from '../../interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit{

  public createArticleForm: FormGroup;
  public previewImage: string;
  public currentArticle: IArticle;
  private articleService = inject(ArticlesService);
  private formBuilder = inject(FormBuilder);
  private destroy$ = new Subject();

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
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

  createArticle() {
    const createdArticle = {
      ...this.createArticleForm.value,
      picture: this.previewImage,
    }
    this.articleService.createArticle(createdArticle).pipe(
      takeUntil(this.destroy$)
    )
  }
}
