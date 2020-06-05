import { Component, OnInit } from '@angular/core';
import { AppAuthNService, User } from '../services/app-auth-n.service';
import { TestApiService } from '../services/test-api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AppAuthNService, TestApiService, DataService]
})
export class HeaderComponent implements OnInit {
  f_name: any;
  l_name: any;
  constructor(
    public authn: AppAuthNService,
    public apiService: TestApiService,
    public dataService: DataService
  ) { }
  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser: User;
  ngOnInit() {
    this.getToken();
  }
  getToken() {
    const data = this.dataService.loggedInUser();
    this.dataService.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }
  clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  public onLogout() {
    this.clearMessages();
    this.authn.logout().catch(err => this.addError(err));
  }
  addMessage(msg: string) {
    this.messages.push(msg);
  }
  addError(msg: string | any) {
    this.messages.push('Error: ' + msg && msg.message);
  }

}
