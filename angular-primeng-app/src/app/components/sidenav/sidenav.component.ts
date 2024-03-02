import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BlogInfo, BlogLinks } from '../../models/blog-info';
import { Subscription } from 'rxjs';
import { SeriesList } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    KeyValuePipe,
    RouterLink,
    SidebarModule,
    ButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  blogInfo!: BlogInfo;
  blogSocialLinks!: BlogLinks;
  seriesList!: SeriesList[];
  blogService: BlogService = inject(BlogService);
  private querySubscription?: Subscription;

  ngOnInit(): void {
    this.querySubscription = this.blogService
      .getBlogInfo()
      .subscribe((data) => {
        this.blogInfo = data;
        const { __typename, ...links } = data.links;
        this.blogSocialLinks = links;
      });
    this.querySubscription = this.blogService
      .getSeriesList()
      .subscribe((data) => {
        this.seriesList = data;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
