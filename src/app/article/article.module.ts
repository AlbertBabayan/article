import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { RouterModule, Routes } from '@angular/router';
import { ActivateArticleGuard } from './guards/activate-article.guard';

const routes: Routes = [
  { 
    path: 'article',
    canActivate: [ActivateArticleGuard],
    component: ArticleComponent
  },
];

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ActivateArticleGuard,
  ],
})
export class ArticleModule { }
