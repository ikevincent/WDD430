import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from './bird.model';

@Injectable({
  providedIn: 'root',
})
export class BirdService {
  private apiUrl = 'http://localhost:3000/api/birds';

  constructor(private http: HttpClient) {}

  getBirds(): Observable<Bird[]> {
    return this.http.get<Bird[]>(this.apiUrl);
  }

  getBird(birdId: string): Observable<Bird> {
    return this.http.get<Bird>(`${this.apiUrl}/${birdId}`);
  }

  addBird(bird: Bird): Observable<Bird> {
    return this.http.post<Bird>(this.apiUrl, bird);
  }

  updateBird(bird): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bird.id}`, bird);
  }

  deleteBird(birdId: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${birdId}`);
  }
}
