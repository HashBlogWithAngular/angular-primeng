import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ThemeService } from "../../services/theme.service";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, KeyValuePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { SeriesList } from "../../models/post";

import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { DialogModule } from "primeng/dialog";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";

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
export class HeaderComponent implements OnInit {
	blogInfo!: BlogInfo;
  blogId: string = "";
	blogName: string = "";
	blogSocialLinks!: BlogLinks;
	checked: boolean = true;
	selectedTheme: string = "dark";
	seriesList!: SeriesList[];
	visible: boolean = false;
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);

	ngOnInit(): void {
		this.blogService
			.getBlogInfo()
			.subscribe((data) => {
				this.blogInfo = data;
        this.blogId = this.blogInfo.id;
				this.blogName = this.blogInfo.title;
				const { __typename, ...links } = data.links;
				this.blogSocialLinks = links;
			});

		this.blogService
			.getSeriesList()
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
}
