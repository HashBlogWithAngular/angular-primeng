import { Component, inject, Input, OnInit } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { Post } from "../../models/post";
import { BlogService } from "../../services/blog.service";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss'
})
export class SearchDialogComponent implements OnInit {
  @Input({required: true}) blogId!: string;

  visible = false;
  posts: Post[] = [];
  queryFormControl = new FormControl('');
  blogService: BlogService = inject(BlogService);
  router: Router = inject(Router);

  ngOnInit() {
    this.queryFormControl.valueChanges.subscribe(query => this.searchPosts(query));
  }

  showDialog() {
    this.visible = true;
  }

  searchPosts(query: string | null) {
    this.blogService.searchPosts(this.blogId, query)
      .subscribe(response => {
        this.posts = response;
      });
  }

  navigateToPost(slug: string) {
    this.visible = false;
    this.router.navigate(['/post', slug]);
  }

  clearQuery() {
    this.queryFormControl.reset();
  }
}
