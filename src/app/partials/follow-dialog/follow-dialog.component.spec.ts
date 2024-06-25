import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowDialogComponent } from './follow-dialog.component';

describe('FollowDialogComponent', () => {
  let component: FollowDialogComponent;
  let fixture: ComponentFixture<FollowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
