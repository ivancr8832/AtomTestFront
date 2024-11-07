import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Pagination, Task } from '../../../../interfaces';
import { TaskService } from '../../../../core/services/task.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CommonModule } from '@angular/common';
import { LabelCompletedPipe } from '../../../../core/pipes/label-completed.pipe';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskActionComponent } from "../../components/task-action/task-action.component";
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TableModule, CommonModule, LabelCompletedPipe, TaskFormComponent, TaskActionComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {

  @ViewChild(TaskFormComponent) taskFormDialogComponent!: TaskFormComponent;

  private taskService = inject(TaskService);
  private confirmationService = inject(ConfirmationService);

  taskPage: Pagination<Task> = {};
  loadingData = false;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(page: number = 1, limit: number = 5) {
    try {
      this.loadingData = true;
      this.taskPage = await this.taskService.list({ page, limit });
    } catch (error: any) {
      Notify.failure(error.message)
    } finally {
      this.loadingData = false;
    }
  }

  onRefreshData(refresh: boolean){
    if (refresh)
      this.loadData();
  }

  onUpdateTask(task: Task) {
    if (this.taskFormDialogComponent) {
      this.taskFormDialogComponent.visible = true;
      this.taskFormDialogComponent.task = task;
      this.taskFormDialogComponent.reloadForm();
    }
  }

  onDeleteTask({ id }: Task) {
    this.confirmationService.confirm({
      target: event!.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-all",
      rejectButtonStyleClass:"px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-all me-4",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: async () => {
        try {
          await this.taskService.delete(id!);
          Notify.success('Task has been successfully completed');
          this.loadData();
        } catch (error: any) {
          Notify.failure(error.message)
        }
      },
    });
  }

}
