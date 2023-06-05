import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHamburgerComponent } from './header-hamburger.component';

describe('HeaderHamburgerComponent', () => {
  let component: HeaderHamburgerComponent;
  let fixture: ComponentFixture<HeaderHamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderHamburgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
