import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PageInfo, Post } from '../../models/post';
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CardModule, InfiniteScrollDirective, ButtonModule,CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts!: Post[];
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: ''};
  isHiddenLoadMore: boolean = true;
  isActiveInfiniteScroll: boolean = false;

  private blogService = inject(BlogService);

	ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
    this.loadPosts();
	}

  private loadPosts(): void {
    this.blogService.getPosts(this.blogURL, this.paginationInfo.endCursor).subscribe(postsPageInfo => {
      this.paginationInfo = postsPageInfo.pagination;
      this.isHiddenLoadMore = !postsPageInfo.pagination.hasNextPage;
      this.posts = postsPageInfo.posts;
    });
  }

  loadMorePosts(): void {
    if (!this.paginationInfo.hasNextPage) {
      return;
    }

    this.isHiddenLoadMore = true;

    this.blogService.getPosts(this.blogURL, this.paginationInfo.endCursor)
      .subscribe(newPosts => {
        this.isActiveInfiniteScroll = true;
        this.paginationInfo = newPosts.pagination;
        this.posts = this.posts.concat(newPosts.posts);
      });
  }
}
