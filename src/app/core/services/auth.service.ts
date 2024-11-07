import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Response, User } from '../../interfaces';
import { environment } from '../../../environments/environment';

const serviceUri = environment.servicesUri + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string): Promise<Login> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<Response<Login>>(`${serviceUri}/login`, { email })
        .subscribe({
          next: (data) => {
            resolve(data.data)
          },
          error: (err) => {
            reject(err.error)
          }
        });
    });
  }

  register(user: User): Promise<Login> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<Response<Login>>(`${serviceUri}`, { ...user })
        .subscribe({
          next: (data) => {
            resolve(data.data)
          },
          error: (err) => {
            reject(err.error)
          }
        });
    });
  }
}
