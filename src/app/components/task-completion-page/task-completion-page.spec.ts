import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompletionPage } from './task-completion-page';

describe('TaskCompletionPage', () => {
  let component: TaskCompletionPage;
  let fixture: ComponentFixture<TaskCompletionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCompletionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
