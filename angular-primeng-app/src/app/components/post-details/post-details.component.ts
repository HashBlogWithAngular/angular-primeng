import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, DatePipe } from "@angular/common";
import { Post, SeriesList } from "../../models/post";
import { Observable, Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { FormsModule } from "@angular/forms";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";
import { FooterComponent } from "../footer/footer.component";
import { ThemeService } from "../../services/theme.service";

import { TagModule } from "primeng/tag";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { YoutubeVideoEmbedDirective } from "../../directives/youtube-video-embed.directive";
import { ViewportScroller } from "@angular/common";

@Component({
	selector: "app-post-details",
	standalone: true,
	imports: [
		DatePipe,
		AsyncPipe,
    SanitizerHtmlPipe,
		RouterLink,
		SidenavComponent,
		FooterComponent,
    YoutubeVideoEmbedDirective,
		FormsModule,
		TagModule,
		ToolbarModule,
		ButtonModule,
		InputSwitchModule,
		SearchDialogComponent,
	],
	templateUrl: "./post-details.component.html",
	styleUrl: "./post-details.component.scss",
})
export class PostDetailsComponent implements OnInit, OnDestroy {
	checked: boolean = true;
	selectedTheme: string = "dark";
  blogURL!: string;
	blogInfo!: BlogInfo;
  blogId: string = "";
	blogName: string = "";
  blogSocialLinks!: BlogLinks;
	seriesList!: SeriesList[];
	post$!: Observable<Post>;
	themeService: ThemeService = inject(ThemeService);
	private blogService: BlogService = inject(BlogService);
  private querySubscription?: Subscription;
  private readonly scroller = inject(ViewportScroller);

	@Input({ required: true }) postSlug!: string;

  ngOnInit(): void {
	this.scroller.scrollToPosition([0, 0]);
    this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
        this.blogId = this.blogInfo.id;
				this.blogName = this.blogInfo.title;
        const { __typename, ...links } = data.links;
        this.blogSocialLinks = links;
			});
		this.post$ = this.blogService.getSinglePost(this.blogURL, this.postSlug);
		this.querySubscription = this.blogService
			.getSeriesList(this.blogURL)
			.subscribe((data) => {
				this.seriesList = data;
			});
	}

	onThemeChange(theme: string): void {
		this.selectedTheme = theme;
		this.themeService.setTheme(theme);
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
