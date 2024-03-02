import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/posts/posts.component')
          .then(c => c.PostsComponent)
      },

      {
        path: 'series/:slug',
        loadComponent: () => import('./components/series/series.component')
          .then(c => c.SeriesComponent)
      }
    ]
  },
  {
    path: 'post/:slug',
    component: PostDetailsComponent
  }
];
