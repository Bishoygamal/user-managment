import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  token:string;
  loginNav:boolean=false;
  logoutNav:boolean=false;
  constructor(   private router: Router) { }

  ngOnInit() {
    this.token=localStorage.getItem('currentUser');
   if(!this.token){
     this.loginNav =true;
     this.logoutNav=false;
     console.log(this.loginNav)
   }else{
     this.loginNav=false;
     this.logoutNav=true;
     console.log(this.loginNav)
   }
  }

  onLogout(){
    console.log('sss')
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
