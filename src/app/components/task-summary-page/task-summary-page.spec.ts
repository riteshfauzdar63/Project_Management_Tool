import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSummaryPage } from './task-summary-page';

describe('TaskSummaryPage', () => {
  let component: TaskSummaryPage;
  let fixture: ComponentFixture<TaskSummaryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSummaryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
