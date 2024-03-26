import { Component, OnInit, OnDestroy, inject, Inject, HostListener } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
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
	imports: [RouterOutlet, HeaderComponent, FooterComponent, ButtonModule],
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
	showScrollButton: boolean = false;
	private readonly scroller = inject(ViewportScroller);

	constructor(@Inject(DOCUMENT) private document: Document) { }

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
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		const yOffset = window.pageYOffset || document.documentElement.scrollTop;
		if (yOffset > 300) { 
			this.showScrollButton = true;
		} else {
			this.showScrollButton = false;
		}
	}

	scrollToTop() {
		this.scroller.scrollToPosition([0, 0]);
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
