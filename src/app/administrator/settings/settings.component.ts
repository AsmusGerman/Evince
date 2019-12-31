import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'evince-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.injector.get(UserService).getUsers();
  }

}
