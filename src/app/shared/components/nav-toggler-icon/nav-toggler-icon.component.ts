import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-toggler-icon',
  templateUrl: './nav-toggler-icon.component.html',
  styleUrls: ['./nav-toggler-icon.component.scss'],
})
export class NavTogglerIconComponent implements OnInit {
  @Input() isClosed = true;

  constructor() {}

  ngOnInit(): void {}
}
