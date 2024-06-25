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
  newBlogInput: string = "";
	newBlogURL: string = "";
	blogURLChanged: boolean = false;
	noBlogFound: boolean = false;
	emptyInput: boolean = false;
	invalidInput: boolean = false;
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
		this.noBlogFound = false;
		if (this.newBlogInput === "") {
			this.emptyInput = true;
			return;
		} else if ( this.newBlogInput !== "") {
      this.emptyInput = false;

      if (this.newBlogInput.includes("https://") || this.newBlogInput.endsWith("/")) {
        const cleanedBlogURL = this.newBlogInput.split("https://")[1];
        this.newBlogURL = cleanedBlogURL.split("/")[0];

      } else {
        this.newBlogURL = this.newBlogInput;
      }

			this.blogService.getBlogInfo(this.newBlogURL).subscribe((blogInfo) => {
				if (blogInfo === null) {
					this.noBlogFound = true;
					this.blogURLChanged = false;
					this.newBlogInput = "";
				} else {
					this.blogService.setBlogURL(this.newBlogURL);
					this.blogURL = this.blogService.getBlogURL();
          this.blogURLChanged = true;
          this.visible = false;
		      window.location.reload();
				}
			});
		} else if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
			this.noBlogFound = true;
			this.emptyInput = false;
			this.blogURLChanged = false;
      this.invalidInput = true;
			this.newBlogInput = "";
		}
	}


	resetBlogURL(): void {
		this.blogService.resetBlogURL();
		this.blogURL = this.blogService.getBlogURL();
		this.emptyInput = false;
		this.blogURLChanged = false;
		this.visible = false;
		window.location.reload();
	}

	showDialog() {
		this.visible = true;
	}
}
