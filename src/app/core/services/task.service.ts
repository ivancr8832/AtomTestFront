import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, Response, Task } from '../../interfaces';
import { environment } from '../../../environments/environment';

const serviceUri = environment.servicesUri + '/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private token = localStorage.getItem('token') ?? '';
  private userInfo = localStorage.getItem('user') ?? '';

  constructor(
    private httpClient: HttpClient
  ) { }

  list(optionsParams?: { page?: number, limit?: number }): Promise<Pagination<Task>> {
    return new Promise((resolve, reject) => {
      const page = optionsParams?.page ?? 1;
      const limit = optionsParams?.limit ?? 5;

      const { id } = JSON.parse(this.userInfo);

      let url = `${serviceUri}?page=${page}&limit=${limit}&userId=${id}`;

      const headers = { 'Authorization': `Bearer ${this.token}` }

      this.httpClient.get<Response<Pagination<Task>>>(url, { headers })
        .subscribe({
          next: ({ data }) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.error);
          }
        });
    });
  }

  getById(id: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Bearer ${this.token}` }

      this.httpClient.get<Response<Task>>(`${serviceUri}/${id}`, { headers })
        .subscribe({
          next: ({ data }) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.error);
          }
        })
    });
  }

  create(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Bearer ${this.token}` }

      const { id } = JSON.parse(this.userInfo);
      task.userId = id;

      this.httpClient.post<Response<Task>>(`${serviceUri}`, { ...task }, { headers })
        .subscribe({
          next: ({ data }) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.error);
          }
        })
    });
  }

  update(id: string, task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Bearer ${this.token}` }

      this.httpClient.put<Response<Task>>(`${serviceUri}/${id}`, { ...task }, { headers })
        .subscribe({
          next: ({ data }) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.error);
          }
        })
    });
  }

  delete(id: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Bearer ${this.token}` }

      this.httpClient.delete<Response<Task>>(`${serviceUri}/${id}`, { headers })
        .subscribe({
          next: ({ data }) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.error);
          }
        })
    });
  }
}
