import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Developer } from 'src/models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperServiceService {
  private developers: Developer[] = [
    {
      id: 1,
      emer: 'Desarda',
      mbiemer: 'Mece',
      email: 'desarda.mece@example.com',
      experienceLevel: 'Senior',
      skills: ['Frontend', 'Backend'],
    },
    {
      id: 2,
      emer: 'Ana',
      mbiemer: 'Maria',
      email: 'ana.maria@example.com',
      experienceLevel: 'Junior',
      skills: ['Frontend'],
    },
    {
      id: 2,
      emer: 'Ana',
      mbiemer: 'Maria',
      email: 'ana.maria@example.com',
      experienceLevel: 'Junior',
      skills: ['Frontend'],
    },
    {
      id: 2,
      emer: 'Ana',
      mbiemer: 'Maria',
      email: 'ana.maria@example.com',
      experienceLevel: 'Junior',
      skills: ['Frontend'],
    },
    {
      id: 2,
      emer: 'Ana',
      mbiemer: 'Maria',
      email: 'ana.maria@example.com',
      experienceLevel: 'Junior',
      skills: ['Frontend'],
    },
    {
      id: 2,
      emer: 'Ana',
      mbiemer: 'Maria',
      email: 'ana.maria@example.com',
      experienceLevel: 'Junior',
      skills: ['Frontend'],
    },
  ];

  getDevelopers(): Observable<Developer[]> {
    return of(this.developers);
  }

  deleteDeveloper(id: number): Observable<void> {
    const index = this.developers.findIndex((dev) => dev.id === id);
    if (index !== -1) {
      this.developers.splice(index, 1);
    }
    return of(void 0);
  }
}
