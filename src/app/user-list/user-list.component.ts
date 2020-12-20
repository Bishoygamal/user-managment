import { Component, Input, OnInit,ViewChild } from '@angular/core';

import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AuthenticateService } from '../services/authenticate.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  newUserForm: FormGroup;
  currentUser: User;
  opened = false;
  firstName:String;
  lastName:String;
  avatar:string;
  userId:String;
  userEmail:String;
  users =[];
  getDeletedId:string;
  @ViewChild('closebutton') closebutton;

  constructor(
    private authenticationService: AuthenticateService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }


   toggleSidebar(userId){
     this.opened = !this.opened;
     this.userId=userId;

   }

  ngOnInit() {
    this.loadAllUsers();
    console.log(this.users)
    this.newUserForm = this.formBuilder.group({
      name: [''],
      job:['']
  });

  }

  get f() { return this.newUserForm.controls; }
  onSubmitNewUser() {
    console.log(this.f.name.value)
    console.log(this.f.job.value)

    // this.userService.addUser( this.f.username.value,this.f.job.value).subscribe(
    //   (res) => {
    //     console.log(res)
    //   }, (err) => {
    //     console.log(err);
    //   }
    //);
    this.userService.addUser(this.f.name.value, this.f.job.value)
    .pipe(first())
    .subscribe(
        data => {
            console.log(data)
            const newUser={
              first_name:this.f.name.value,
              avatar:'../../assets/avatar.png'
            }
            this.users['data'].push(newUser)
            this.closebutton.nativeElement.click();

        },
        error => {
            console.log(error)
        });


  }
  getIdfromDeleted(id :string){
    if(id){
      this.getDeletedId = id;
      this.users['data'] = this.users['data'].filter(value => value.id !== this.getDeletedId);

    }
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => {this.users = users});
}



}
