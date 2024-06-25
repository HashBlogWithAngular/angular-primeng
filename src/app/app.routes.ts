import { Routes } from "@angular/router";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostsComponent } from "./components/posts/posts.component";
import { SeriesComponent } from "./components/series/series.component";
import { LayoutComponent } from "./components/layout/layout.component";

export const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{
				path: "",
				component: PostsComponent,
			},
      {
        path: "series/:slug",
        component: SeriesComponent,
      },
		],
	},
	{
		path: "post/:postSlug",
		component: PostDetailsComponent,
	},
	{
		path: "**",
		redirectTo: "",
	},
];
