import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<User[]>(`https://reqres.in/api/users?page=2`);
}

getSingleUser(id){
  return this.http.get<User[]>(`https://reqres.in/api/users/${id}`);
}


updateUser(id,email,password) {
  return this.http.put(<any>`https://reqres.in/api/users/${id}`, { email, password }).pipe(map((res) => {
    return new User(res)

  }));
}
deleteUser(id) {
  return this.http.delete(`https://reqres.in/api/users/${id}`).pipe(map((data) => data));
}
addUser(name,job) {
  // return this.http.post(`https://reqres.in/api/users`,{username,job}).pipe(map((res) => {
  //   return new User(res);
  // }));

  return this.http.post<any>(`https://reqres.in/api/users`, { name, job })
  .pipe(map(user => {
      return user;
  }));
}

}
