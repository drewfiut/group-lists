import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css'],
})
export class JoinGroupComponent implements OnInit {
  code: string;
  error: string;

  constructor(
    public groupService: GroupService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(user) {
    this.groupService
      .joinGroup(this.code, user)
      .then((val) => this.router.navigate(['groups']))
      .catch((err) => {
        if (err === 'no group') {
          this.error = "This group doesn't exist!";
        } else if (err == 'already in group') {
          this.error = "You're already in this group!!";
        } else {
          console.log({ err });
        }
      });
  }
}
