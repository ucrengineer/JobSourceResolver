import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUploadComponent } from './job-upload.component';

describe('JobUploadComponent', () => {
  let component: JobUploadComponent;
  let fixture: ComponentFixture<JobUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
