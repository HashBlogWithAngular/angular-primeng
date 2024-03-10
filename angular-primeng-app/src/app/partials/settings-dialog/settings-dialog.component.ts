import { Component, inject, OnInit } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
	selector: "app-settings-dialog",
	standalone: true,
	imports: [
		DialogModule,
		InputTextModule,
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: "./settings-dialog.component.html",
	styleUrl: "./settings-dialog.component.scss",
})
export class SettingsDialogComponent implements OnInit {
	visible = false;
	blogURL: string = "hashnode.anguhashblog.com";
	newBlogURL: string = "";
	blogURLChanged: boolean = false;
	blogService: BlogService = inject(BlogService);

	ngOnInit() {
		this.blogURL = this.blogService.getBlogURL();
		if (this.blogURL === "hashnode.anguhashblog.com") {
			this.blogURLChanged = false;
		} else {
			this.blogURLChanged = true;
		}
	}

  changeBlogURL(): void {
    this.blogService.setBlogURL(this.newBlogURL);
    this.blogURL = this.blogService.getBlogURL();
    if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
      this.blogURLChanged = true;
    }
  }

  resetBlogURL(): void {
    this.blogService.resetBlogURL();
    this.blogURL = this.blogService.getBlogURL();
    this.blogURLChanged = false;
  }

	showDialog() {
		this.visible = true;
	}
}
