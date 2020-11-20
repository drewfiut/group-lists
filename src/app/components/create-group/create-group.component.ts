import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  name: string;
  desc: string;

  constructor(
    public auth: AuthService,
    public groupService: GroupService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(user) {
    this.groupService
      .createGroup(this.name, this.desc, user)
      .then((val) => this.router.navigate(['groups']));
  }
}
