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

  getBirdById(id: string) {
    return this.http.get<Bird>(`/api/birds/${id}`);
  }

  addBird(bird: Bird): Observable<Bird> {
    return this.http.post<Bird>(this.apiUrl, bird);
  }

  updateBird(id: string, bird: Bird) {
    return this.http.put(`/api/birds/${id}`, bird);
  }

  deleteBird(birdId: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${birdId}`);
  }
}
