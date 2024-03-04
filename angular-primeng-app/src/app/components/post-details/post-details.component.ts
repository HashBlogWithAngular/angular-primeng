import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogInfo, BlogLinks } from '../../models/blog-info';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FooterComponent } from '../footer/footer.component';
import { ThemeService } from '../../services/theme.service';

import { TagModule } from 'primeng/tag';
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";

import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    RouterLink,
    SidenavComponent,
    FooterComponent,
    FormsModule,
    TagModule,
    ToolbarModule,
    ButtonModule,
    InputSwitchModule,
    SanitizerHtmlPipe,
    SearchDialogComponent
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  post$!: Observable<Post>;
  blogInfo!: BlogInfo;
  blogId: string = "";
  blogName: string = "";
  checked: boolean = true;
  selectedTheme: string = "dark";
  themeService: ThemeService = inject(ThemeService);
  private blogService: BlogService = inject(BlogService);

  @Input({required: true})
  set slug(slug: string) {
    this.post$ = this.blogService.getSinglePost(slug);
  }

  ngOnInit(): void {
    this.blogService
      .getBlogInfo()
      .subscribe((data) => {
        this.blogInfo = data;
        this.blogId = this.blogInfo.id;
        this.blogName = this.blogInfo.title;
      });
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }
}
