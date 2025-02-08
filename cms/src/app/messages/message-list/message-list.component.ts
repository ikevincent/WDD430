import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,

  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      2,
      'PowerPoint Update?',
      'Were you able to make changes?',
      'Noelle'
    ),
    new Message(3, 'Thank you!', 'Everything looks great!', 'Nora'),
    new Message(4, 'Help!!', 'I broke the code, please help!', 'Dave'),
  ];

  constructor() {}

  ngOnInit() {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
