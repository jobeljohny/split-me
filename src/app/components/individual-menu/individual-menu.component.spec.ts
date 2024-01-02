import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMenuComponent } from './individual-menu.component';

describe('IndividualMenuComponent', () => {
  let component: IndividualMenuComponent;
  let fixture: ComponentFixture<IndividualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
