export type Post = {
  id: string;
  slug: string;
  title: string;
  readTimeInMinutes: number;
  tags: Tag[];
  author: Author;
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
  name: string;
  profilePicture: string;
  socialMediaLinks: SocialMediaLinks;
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

