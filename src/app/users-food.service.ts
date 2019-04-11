import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'http://localhost:3001/';
//const BASE_URL = 'https://thales-code-challenge-backend.herokuapp.com/';

@Injectable()
export class UsersFoodService {
  constructor(private http: HttpClient) {}
  getUsersFood() {
    return this.http.get(BASE_URL + 'users/foods');
  }
  postUserFood(user) {
    return this.http.post(BASE_URL + 'users/food', user);
  }
  deleteFood(id) {
    return this.http.delete(BASE_URL + 'users/food', { params: { id: id }});
  }
}
