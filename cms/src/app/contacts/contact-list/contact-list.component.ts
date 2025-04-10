import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,

  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contacts: Contact[] = [];
  term: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  search(value: string): void {
    this.term = value; // Update the term property
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
