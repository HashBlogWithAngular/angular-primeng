export interface BlogInfo {
  id: string;
  title: string;
  isTeam?: boolean;
  links: BlogLinks;
  followersCount: number;
  url: string;
  favicon?: string;
}

export type BlogLinks = {
  __typename?: string;
  twitter: string;
  instagram: string;
  github: string;
  website: string;
  hashnode: string;
  youtube: string;
  dailydev: string;
  linkedin: string;
  mastodon: string;
};
