import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Task } from '../../../../interfaces';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { TaskService } from '../../../../core/services/task.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputSwitchModule, CalendarModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() task: Task | null = null;
  @Output() refreshListChange = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  taskForm!: FormGroup;
  titleDialog = 'Add Task';
  currentDate!: string;
  isSubmited: boolean = false;
  textButtonSubmit: string = 'Submit';
  private reloadFormSubject = new Subject<void>();

  ngOnInit(): void {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      dateCreated: [this.currentDate, [Validators.required]],
      completed: [false]
    });

    this.reloadFormSubject.subscribe(() => {
      this.initializeForm();
    });
  }

  initializeForm() {
    if (this.task) {

      this.titleDialog = 'Edit Task';

      const dateSelected = this.task.dateCreated
      ? new Date(this.task.dateCreated).toISOString().split('T')[0]
      : null;

      this.taskForm.patchValue({ ...this.task, dateCreated: dateSelected });
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(){
    this.taskForm.reset();
    this.visible = false;
  }

  async onSubmit() {
    this.isSubmited = true;
    this.textButtonSubmit = 'Saving';

    try {
      const taskData: Task = {
        title: this.taskForm.value.title.trim(),
        dateCreated: new Date(this.taskForm.value.dateCreated + 'T00:00:00'),
        completed: this.taskForm.value.completed
      }

      if (!this.task) {
        await this.taskService.create(taskData);
      } else {
        await this.taskService.update(this.task.id!, taskData);
      }


      Notify.success('Task Saving Successfully');
      this.taskForm.reset();
      this.visible = false;
      this.refreshListChange.emit(true);

    } catch (error: any) {
      Notify.failure(error.message)
      this.refreshListChange.emit(false);
    } finally {
      this.isSubmited = false;
      this.textButtonSubmit = 'Submit';
    }
  }

  reloadForm() {
    this.reloadFormSubject.next();
  }
}
