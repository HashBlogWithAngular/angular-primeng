import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-follow-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.scss'
})
export class FollowDialogComponent {
	visible: boolean = false;

  showDialog() {
		this.visible = true;
	}
}
