import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivateArticleGuard } from './guards/activate-article.guard';
import { ArticlesService } from './services/articles.service';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './components/article/article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'article',
    canActivate: [ActivateArticleGuard],
    component: ArticleComponent,
  },
  { path: 'edit-article/:id', component: EditArticleComponent },
  { path: 'create-article', component: CreateArticleComponent },
];

@NgModule({
  declarations: [
    ArticleComponent,
    EditArticleComponent,
    CreateArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ActivateArticleGuard,
    ArticlesService
  ],
})
export class ArticleModule { }
