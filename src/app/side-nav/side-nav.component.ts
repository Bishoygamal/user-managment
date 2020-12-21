import { Component, OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { ToastrManager } from 'ng6-toastr-notifications';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  updateForm: FormGroup;
  @Input('currentUsers') currentUsers;
  @Input('id') id:string;
  @Input('firstName') firstName:string;
  @Input('lastName') lastName:string;
  @Input('avatar') avatar:string;
  @Input('sideNavOpened') sideNavOpened:boolean;
  @Output() outPutIdtoParent = new EventEmitter<string>();
  singleUser: Object;
  @ViewChild('closebutton') closebutton;
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager

  ) { }

  ngOnInit() {
    this.singleUser={
      data:{
        id:'',
        avatar:'',
        first_name:'',
        last_name:''
      }
    }
    this.updateForm = this.formBuilder.group({
      username: [''],
      email: ['']
  });
  }
  ngOnChanges(changes): void {
    // do something with this.someInput
    setTimeout(() => {
      this.getSingleUser(this.id);
      console.log(this.singleUser)
    }, 0);

}
onSideNavClose(){
  this.sideNavOpened=false;
}
get f() { return this.updateForm.controls; }

onUpdate(){

  this.userService.updateUser(this.id,this.f.username.value, this.f.email.value)
  this.closebutton.nativeElement.click();
  this.sideNavOpened=false;
}
  private getSingleUser(id){
    this.userService.getSingleUser(id)
    .pipe(first())
    .subscribe(value => this.singleUser = value);

  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      res => {
        this.outPutIdtoParent.emit(id);


        this.toastr.successToastr( this.firstName+' had been deleted', 'Success!');
        this.closebutton.nativeElement.click();
        this.sideNavOpened=false;
      }, (err) => {
        console.log('delete error'+err);
      }
    );

  }

}
