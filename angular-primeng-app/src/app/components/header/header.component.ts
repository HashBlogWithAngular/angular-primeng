import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ThemeService } from "../../services/theme.service";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, KeyValuePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { SeriesList } from "../../models/post";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";
import { Subscription } from "rxjs";

import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-header",
	standalone: true,
  imports: [
    AsyncPipe,
    SearchDialogComponent,
    ButtonModule,
    FormsModule,
    InputSwitchModule,
    KeyValuePipe,
    RouterLink,
    ToolbarModule,
    DialogModule,
  ],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  blogURL!: string;
  blogInfo!: BlogInfo;
  blogId: string = "";
  blogName: string = "";
  blogImage: string = "/assets/images/anguhashblog-logo-purple-bgr.jpg";
	blogSocialLinks!: BlogLinks;
	checked: boolean = true;
	selectedTheme: string = "dark";
	seriesList!: SeriesList[];
	visible: boolean = false;
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);

  private querySubscription?: Subscription;

	ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogId = this.blogInfo.id;
				this.blogName = this.blogInfo.title;
        if (this.blogInfo.isTeam && this.blogInfo.favicon) {
          this.blogImage = this.blogInfo.favicon;
        } else {
          this.blogImage = '/assets/images/anguhashblog-logo-purple-bgr.jpg'
        }
        if (!this.blogInfo.isTeam) {
          this.blogService
            .getAuthorInfo(this.blogURL)
            .subscribe((data) => {
              if (data.profilePicture) {
                this.blogImage = data.profilePicture;
              } else {
                this.blogImage = '/assets/images/anguhashblog-logo-purple-bgr.jpg'
              }
            });
        }
				const { __typename, ...links } = data.links;
				this.blogSocialLinks = links;
			});

		this.blogService
			.getSeriesList(this.blogURL)
			.subscribe((data) => {
				this.seriesList = data;
			});
	}

	onThemeChange(theme: string): void {
		this.selectedTheme = theme;
		this.themeService.setTheme(theme);
	}

	showDialog() {
		this.visible = true;
	}

  ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
