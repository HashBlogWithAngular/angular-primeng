export type Post = {
  id: string;
  slug: string;
  title: string;
  readTimeInMinutes: number;
  tags: Tag[];
  author: Author;
  coAuthors: coAuthor[];
  coverImage: CoverImage;
  content: Content;
  publishedAt: string;
};

export interface SeriesList {
  id: string;
  name: string;
  slug: string;
  coverImage?: string;
  posts?: Post[];
}

export interface Tag {
  name: string;
}

export interface Author {
  id : string,
  name: string;
  username : string ,
  profilePicture: string;
  socialMediaLinks: SocialMediaLinks;
}

export interface coAuthor {
  username: string;
  profilePicture: string;
}

export interface SocialMediaLinks {
  facebook: string;
  github: string;
  instagram: string;
  linkedin: string;
  stackoverflow: string;
  twitter: string;
  website: string;
  youtube: string;
}

export interface CoverImage {
  url: string;
}

export interface Content {
  html: string;
}

export interface PostsPageInfo {
  posts: Post[];
  pagination: PageInfo;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
