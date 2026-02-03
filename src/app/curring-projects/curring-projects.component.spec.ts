import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurringProjectsComponent } from './curring-projects.component';

describe('CurringProjectsComponent', () => {
  let component: CurringProjectsComponent;
  let fixture: ComponentFixture<CurringProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurringProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurringProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
