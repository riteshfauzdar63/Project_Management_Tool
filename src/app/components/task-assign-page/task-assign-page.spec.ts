import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignPage } from './task-assign-page';

describe('TaskAssignPage', () => {
  let component: TaskAssignPage;
  let fixture: ComponentFixture<TaskAssignPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAssignPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
