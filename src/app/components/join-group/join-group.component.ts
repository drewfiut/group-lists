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
        if (err.code === 'not-found') {
          this.error = "This group doesn't exist!";
        }
      });
  }
}
