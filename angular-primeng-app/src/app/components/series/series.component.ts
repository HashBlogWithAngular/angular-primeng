import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageInfo, Post } from '../../models/post';
import { AsyncPipe } from "@angular/common";
import { BlogService } from '../../services/blog.service';
import { CardModule } from 'primeng/card';
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CardModule, InfiniteScrollDirective, ButtonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  blogURL!: string;
  slug: string = "";
  postsInSeries: Post[] = [];
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: '' };
  isHiddenLoadMore: boolean = true;
  isActiveInfiniteScroll: boolean = false;

  blogService: BlogService = inject(BlogService);
	route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
		this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.loadPostsInSeries();
    })
	}

  private loadPostsInSeries():void{
    this.blogService.getPostsInSeries(this.blogURL, this.slug).subscribe(seriesPageInfo => {
      this.paginationInfo = seriesPageInfo.pagination;
      this.isHiddenLoadMore = !seriesPageInfo.pagination.hasNextPage;
      this.postsInSeries = seriesPageInfo.posts;
    })
  }

  loadMorePostsFromSeries():void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPostsInSeries(this.blogURL, this.slug, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.postsInSeries = this.postsInSeries.concat(newPosts.posts);
    });
  }
}
