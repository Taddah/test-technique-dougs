import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, VisibleCategory } from '@models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3001';

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all-categories`);
  }

  getVisibleCategories(): Observable<VisibleCategory[]> {
    return this.http.get<VisibleCategory[]>(`${this.baseUrl}/visible-categories`);
  }
}
