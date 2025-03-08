import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolver implements Resolve<any> {
  constructor(private contactService: ContactService) {}

  resolve() {
    return this.contactService.getContacts();
  }
}
