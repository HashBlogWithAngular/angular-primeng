import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';

import { ToolbarModule } from 'primeng/toolbar';
import { BlogInfo } from '../../models/blog-info';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  blogURL!: string;
  blogInfo!: BlogInfo;
  blogName = '';
  date = new Date().getFullYear();
  blogService: BlogService = inject(BlogService);

  private querySubscription?: Subscription;

  ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
    this.querySubscription = this.blogService.getBlogInfo(this.blogURL)
      .subscribe((data) => this.blogName = data.title);
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}
