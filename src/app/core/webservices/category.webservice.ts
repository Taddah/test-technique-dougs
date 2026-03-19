import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, VisibleCategory } from '@models/category.model';
import { CATEGORY_API_URL } from '@core/tokens/category-api-url.token';

@Injectable({
  providedIn: 'root',
})
export class CategoryWebService {
  readonly #http = inject(HttpClient);
  readonly #categoryApiUrl = inject(CATEGORY_API_URL);

  getAllCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${this.#categoryApiUrl}/all-categories`);
  }

  getVisibleCategories(): Observable<VisibleCategory[]> {
    return this.#http.get<VisibleCategory[]>(`${this.#categoryApiUrl}/visible-categories`);
  }
}
