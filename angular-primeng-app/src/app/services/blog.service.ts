import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable, map, of } from 'rxjs';
import { GET_AUTHOR_INFO, GET_BLOG_INFO, GET_POSTS, GET_POSTS_IN_SERIES, GET_SERIES_LIST, GET_SINGLE_POST, SEARCH_POSTS } from '../graphql.operations';
import { Author, Post, SeriesList } from '../models/post';
import { BlogInfo } from '../models/blog-info';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private apollo: Apollo) { }

  getBlogInfo(): Observable<BlogInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BLOG_INFO,
    })
    .valueChanges.pipe(map(({ data }) => data.publication));
  }

  getAuthorInfo(): Observable<Author> {
    return this.apollo
    .watchQuery<any>({
      query: GET_AUTHOR_INFO,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.author));
  }

  getPosts(): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.posts.edges.map((edge: { node: any; }) => edge.node)));
  }

  getSeriesList(): Observable<SeriesList[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_SERIES_LIST,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.seriesList.edges.map((edge: { node: any; }) => edge.node)));
  }

  getPostsInSeries(slug: string): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS_IN_SERIES,
      variables: {
        slug: slug,
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.series.posts.edges.map((edge: { node: any; }) => edge.node)));
  }


  getSinglePost(slug: string): Observable<Post>{
    return this.apollo
    .watchQuery<any>({
      query: GET_SINGLE_POST,
      variables: {
        slug: slug,
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.post));
  }

  searchPosts(blogId: string, query: string | null): Observable<Post[]> {
    if (query === null || query.length === 0) {
      return of([]);
    }

    return this.apollo
      .watchQuery<any>({
        query: SEARCH_POSTS,
        variables: {
          publicationId: blogId,
          query: query
        }
      })
      .valueChanges.pipe(map(({ data }) => data.searchPostsOfPublication.edges.map((edge: { node: any; }) => edge.node)));
  }
}
