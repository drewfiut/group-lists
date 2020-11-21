import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  group$;
  id;

  constructor(
    private route: ActivatedRoute,
    public groupService: GroupService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.auth.user$.subscribe((user) => {
      this.group$ = this.groupService.getGroup(this.id);
    });
  }

  onLeave(user, group) {
    this.groupService.leaveGroup(user, group);
    this.router.navigate(['/groups']);
  }

  onDelete(group) {
    this.groupService.deleteGroup(group);
    this.router.navigate(['/groups']);
  }
}
