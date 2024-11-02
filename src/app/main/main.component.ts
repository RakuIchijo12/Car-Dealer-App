import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private user: User[] = [];

  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.loadUser();
  }

  loadUser(){
    this.userService.getUser().subscribe((response: any)=>{
      this.user = response.data;
    })
  }
}
