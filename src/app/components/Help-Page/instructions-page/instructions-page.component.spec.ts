import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsPageComponent } from './instructions-page.component';

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
