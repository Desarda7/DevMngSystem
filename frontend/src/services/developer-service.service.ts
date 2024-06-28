import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Developer } from 'src/models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  getAllDevelopers(): Observable<Developer[]> {
    return this.httpClient.get<Developer[]>(
      'http://localhost:8083/api/developers'
    );
  }
  getDeveloper(id: number): Observable<Developer> {
    return this.httpClient.get<Developer>(
      'http://localhost:8083/api/developers/' + id
    );
  }

  deleteDeveloper(developer: Developer): Observable<Developer> {
    return this.httpClient.delete<Developer>(
      'http://localhost:8083/api/developers/' + developer.id,
      this.httpOptions
    );
  }

  createDeveloper(developer: Developer): Observable<Developer> {
    return this.httpClient.post<Developer>(
      'http://localhost:8083/api/developers',
      developer,
      this.httpOptions
    );
  }

  updateDeveloper(developer: Developer): Observable<Developer> {
    return this.httpClient.put<Developer>(
      'http://localhost:8083/api/developers/' + developer.id,
      developer,
      this.httpOptions
    );
  }
}
