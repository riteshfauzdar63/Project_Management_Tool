import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutionPage } from './task-execution-page';

describe('TaskExecutionPage', () => {
  let component: TaskExecutionPage;
  let fixture: ComponentFixture<TaskExecutionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskExecutionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskExecutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
