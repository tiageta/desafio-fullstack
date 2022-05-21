import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `<small class="text-danger d-block mt-1">{{ message }}</small>`,
})
export class MessageComponent implements OnInit {
  @Input() message = '';

  constructor() {}

  ngOnInit(): void {}
}
