import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      1,
      'W01 Assignment',
      'Completed W01 assignment',
      'http://example.com/doc1'
    ),
    new Document(
      2,
      'W02 Assignment',
      'Completed W02 assignment',
      'http://example.com/doc2'
    ),
    new Document(
      3,
      'W03 Assignment',
      'Completed W03 assignment',
      'http://example.com/doc3'
    ),
    new Document(
      4,
      'W04 Assignment',
      'Completed W04 assignment',
      'http://example.com/doc4'
    ),
    new Document(
      5,
      'W05 Assignment',
      'Completed W05 assignment',
      'http://example.com/doc5'
    ),
  ];

  constructor() {}

  ngOnInit() {}

  onSelectDocument(document: Document): void {
    this.selectedDocumentEvent.emit(document);
  }
}
