import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
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
  @Input('sideNavOpened') sideNavOpened:boolean;
  @Output() outPutIdtoParent = new EventEmitter<string>();
  singleUser: Object;
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.singleUser={
      data:{
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

get f() { return this.updateForm.controls; }

onUpdate(){

  this.userService.updateUser(this.id,this.f.username.value, this.f.email.value)
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

        console.log(id)
        console.log('User Deleted!');
      }, (err) => {
        console.log(err);
      }
    );
  }

}
