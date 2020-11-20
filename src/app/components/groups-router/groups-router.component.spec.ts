import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsRouterComponent } from './groups-router.component';

describe('GroupsRouterComponent', () => {
  let component: GroupsRouterComponent;
  let fixture: ComponentFixture<GroupsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
