import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesProjectsComponent } from './case-studies-projects.component';

describe('CaseStudiesProjectsComponent', () => {
  let component: CaseStudiesProjectsComponent;
  let fixture: ComponentFixture<CaseStudiesProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudiesProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
