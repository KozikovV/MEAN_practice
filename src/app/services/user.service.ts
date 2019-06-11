import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = SERVICE_URL.users;

  constructor(
    private httpClient: HttpClient
  ) { }

  singup({name, surname, nickName, password, email, image, age, weight, hight}) {
    const user = new FormData();
    user.append('name', name);
    user.append('surname', surname);
    user.append('nickName', nickName);
    user.append('password', password);
    user.append('email', email);
    user.append('image', image, nickName);
    user.append('age', age);
    user.append('weight', weight);
    user.append('hight', hight);

    return this.httpClient.post(this.baseUrl + '/singup', user);
  }

  login(credentials: {nickName: string, password: string}) {
    return this.httpClient.post(this.baseUrl + '/login', credentials);
  }
}
