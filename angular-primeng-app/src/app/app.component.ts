import { Component, OnInit, OnDestroy, inject, Inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Subscription, fromEvent } from "rxjs";
import { BlogInfo } from "./models/blog-info";
import { BlogService } from "./services/blog.service";
import { ThemeService } from "./services/theme.service";
import { DOCUMENT, ViewportScroller } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ButtonModule } from "primeng/button";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent,ButtonModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
	title = "angular-primeng-app";
	blogURL!: string;
	blogInfo!: BlogInfo;
	siteFavicon: any;
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);
	private querySubscription?: Subscription;
	private scrollEvntSub?: Subscription;
	enableScrollUp: boolean=false;
	private readonly scroller = inject(ViewportScroller);

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.blogURL = this.blogService.getBlogURL();
		this.siteFavicon = this.document.querySelector(
			'link[rel="icon"]'
		) as HTMLLinkElement;
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				if (this.blogInfo.isTeam && this.blogInfo.favicon) {
					this.siteFavicon.href = this.blogInfo.favicon;
				} else {
					this.siteFavicon.href = "favicon.ico";
				}
				if (!this.blogInfo.isTeam) {
					this.blogService.getAuthorInfo(this.blogURL).subscribe((data) => {
						if (data.profilePicture) {
							this.siteFavicon.href = data.profilePicture;
						} else {
							this.siteFavicon.href = "favicon.ico";
						}
					});
				}
			});

		this.scrollEvntSub = fromEvent(this.document, 'scroll')
			.subscribe(() => {
				if (this.calculatePositionScroll() > 50)
					this.enableScrollUp = true;
				else
					this.enableScrollUp = false;
			})
	}

	goPageTop() {
		this.scroller.scrollToPosition([0, 0]);
	}

	calculatePositionScroll(): number {
		var scrollTop = this.document.documentElement.scrollTop;
		var docHeight = this.document.documentElement.scrollHeight;
		var winHeight = this.document.documentElement.clientHeight;
		var scrollPercent = (scrollTop) / (docHeight - winHeight);
		return Math.round(scrollPercent * 100);
	}

	ngOnDestroy(): void {
		this.scrollEvntSub?.unsubscribe();
		this.querySubscription?.unsubscribe();
	}
}
