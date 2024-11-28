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
    this.blogURLChanged = this.blogURL !== "hashnode.anguhashblog.com";
  }

  changeBlogURL(): void {
    // Reset flags
    this.noBlogFound = false;
    this.emptyInput = false;
    this.invalidInput = false;

    // Validate input
    if (!this.newBlogInput.trim()) {
      this.emptyInput = true;
      return;
    }

    // Clean and parse the blog URL
    this.newBlogURL = this.cleanBlogURL(this.newBlogInput);

    if (!this.newBlogURL) {
      this.invalidInput = true;
      return;
    }

    // Check if it's the default URL case
    if (this.newBlogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
      return;
    }

    // Validate blog URL via the service
    this.blogService.getBlogInfo(this.newBlogURL).subscribe((blogInfo) => {
      if (blogInfo === null) {
        // Blog not found
        this.noBlogFound = true;
        this.blogURLChanged = false;
        this.newBlogInput = "";
      } else {
        // Valid blog found
        this.blogService.setBlogURL(this.newBlogURL);
        this.blogURL = this.blogService.getBlogURL();
        this.blogURLChanged = true;
        this.visible = false;
        window.location.reload();
      }
    });
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

  private cleanBlogURL(input: string): string {
    // Strip "https://" and trailing slashes if present
    if (input.includes("https://")) {
      input = input.split("https://")[1];
    }
    return input.endsWith("/") ? input.slice(0, -1) : input;
  }
}
