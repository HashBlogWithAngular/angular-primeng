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
    SanitizerHtmlPipe
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post$!: Observable<Post>;
  blogInfo!: BlogInfo;
  blogName: string = "";
	blogSocialLinks!: BlogLinks;
	checked: boolean = true;
	selectedTheme: string = "dark";
  route: ActivatedRoute = inject(ActivatedRoute);
  private blogService: BlogService = inject(BlogService);
  themeService: ThemeService = inject(ThemeService);
  private querySubscription?: Subscription;

  @Input({ required: true }) slug!: string;

  ngOnInit(): void {
    this.querySubscription = this.blogService
    .getBlogInfo()
    .subscribe((data) => {
      this.blogInfo = data;
      this.blogName = this.blogInfo.title;
    });
    this.post$ = this.blogService.getSinglePost(this.slug);
  }

  onThemeChange(theme: string): void {
		this.selectedTheme = theme;
		this.themeService.setTheme(theme);
	}

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
