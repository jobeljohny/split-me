import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDragPreviewComponent } from './profile-drag-preview.component';

describe('ProfileDragPreviewComponent', () => {
  let component: ProfileDragPreviewComponent;
  let fixture: ComponentFixture<ProfileDragPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDragPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDragPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
