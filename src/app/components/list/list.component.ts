import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() current;
  @Input() memberID;
  @Input() group;
  member$;


  constructor(public groupService: GroupService) { }

  ngOnInit(): void {
    this.member$ = this.groupService.getMember(this.group.id, this.memberID);
  }



}
