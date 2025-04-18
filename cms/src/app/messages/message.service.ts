import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from '../contacts/contacts.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  private messagesUrl = 'http://localhost:3000/api/messages';
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getMessages(): Message[] {
    this.http
      .get<Message[]>(this.messagesUrl)
      .subscribe((messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });

    return this.messages.slice();
  }

  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id) || null;
  }

  // addMessage(message: Message): void {
  //   this.messages.push(message);
  //   this.storeMessages();
  // }
  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; newMessage: Message }>(
        this.messagesUrl,
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.newMessage);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
