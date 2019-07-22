import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login, ProfileContent, Singup} from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = SERVICE_URL.users;

  constructor(
    private httpClient: HttpClient
  ) { }

  singup({name, surname, nickName, password, email, image, age, weight, height}): Observable<Singup> {
    const user = new FormData();
    user.append('name', name);
    user.append('surname', surname);
    user.append('nickName', nickName);
    user.append('password', password);
    user.append('email', email);
    user.append('image', image, nickName);
    user.append('age', age);
    user.append('weight', weight);
    user.append('height', height);

    return this.httpClient.post<Singup>(this.baseUrl + '/singup', user);
  }

  login(credentials: {nickName: string, password: string}): Observable<Login> {
    return this.httpClient.post<Login>(this.baseUrl + '/login', credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  getProfileInformation(): Observable<ProfileContent> {
    return this.httpClient.get<ProfileContent>(this.baseUrl + '/profile');
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
