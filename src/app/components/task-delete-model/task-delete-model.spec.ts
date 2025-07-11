import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteModel } from './task-delete-model';

describe('TaskDeleteModel', () => {
  let component: TaskDeleteModel;
  let fixture: ComponentFixture<TaskDeleteModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDeleteModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDeleteModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
