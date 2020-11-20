import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groups$;

  constructor(public auth: AuthService, public groupService: GroupService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.groups$ = this.groupService.getGroups(user.uid);
    });
  }
}
