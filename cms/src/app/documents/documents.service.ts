import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  private documentsUrl = 'http://localhost:3000/documents';

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = +document.id;
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentsUrl, { responseType: 'json' })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  // addDocument(newDocument: Document) {
  //   if (!newDocument) {
  //     return;
  //   }

  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   this.storeDocuments();
  // }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';
    document._id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.storeDocuments();
      });
  }

  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   }

  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  //   deleteDocument(document: Document) {
  //     if (!document) {
  //       return;
  //     }
  //     const pos = this.documents.indexOf(document);
  //     if (pos < 0) {
  //       return;
  //     }
  //     this.documents.splice(pos, 1);
  //     this.storeDocuments();
  //   }
  // }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.documentsUrl}/${document.id}`;

    this.http
      .delete(url, { headers: headers })
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
