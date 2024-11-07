import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaskFormComponent } from "../task-form/task-form.component";
import { TasksListComponent } from '../../pages/tasks-list/tasks-list.component';

@Component({
  selector: 'app-task-action',
  standalone: true,
  imports: [TaskFormComponent, TasksListComponent],
  templateUrl: './task-action.component.html',
  styleUrl: './task-action.component.scss'
})
export class TaskActionComponent {

  @ViewChild(TaskFormComponent) taskFormDialogComponent!: TaskFormComponent;
  @Output() refreshListChange = new EventEmitter<boolean>();

  openTaskDialog() {
    if (this.taskFormDialogComponent) {
      this.taskFormDialogComponent.visible = true;
    }
  }

  onRefreshData(refresh: boolean){
    this.refreshListChange.emit(refresh);
  }
}
