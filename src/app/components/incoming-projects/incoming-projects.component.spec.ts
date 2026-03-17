import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingProjectsComponent } from './incoming-projects.component';

describe('IncomingProjectsComponent', () => {
  let component: IncomingProjectsComponent;
  let fixture: ComponentFixture<IncomingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
