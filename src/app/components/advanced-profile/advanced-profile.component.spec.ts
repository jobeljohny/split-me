import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedProfileComponent } from './advanced-profile.component';

describe('AdvancedProfileComponent', () => {
  let component: AdvancedProfileComponent;
  let fixture: ComponentFixture<AdvancedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
