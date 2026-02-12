import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPrivateComponent } from './navbar-private.component';

describe('NavbarPrivateComponent', () => {
  let component: NavbarPrivateComponent;
  let fixture: ComponentFixture<NavbarPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPrivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
