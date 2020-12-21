import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AuthenticateService } from '../services/authenticate.service';
import { ToastrManager } from 'ng6-toastr-notifications';

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
    public toastr: ToastrManager,
    private router: Router,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

   }


   toggleSidebar(userId,firstName,lastName,avatar){
     this.opened = !this.opened;
     this.userId=userId;
     this.firstName=firstName;
     this.lastName=lastName;
     this.avatar=avatar;

   }

  ngOnInit() {
    this.loadAllUsers();
    console.log(this.currentUser)

    this.newUserForm = this.formBuilder.group({
      name: [''],
      job:['']
  });

  }

  get f() { return this.newUserForm.controls; }
  onSubmitNewUser() {

    this.userService.addUser(this.f.name.value, this.f.job.value)
    .pipe(first())
    .subscribe(
        data => {
            console.log(data)
            const newUser={
              id:data.id,
              first_name:this.f.name.value,
              avatar:'../../assets/avatar.png'
            }
            this.toastr.successToastr( this.f.name.value+' had been added', 'Success!');
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
