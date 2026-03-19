import { InjectionToken } from '@angular/core';
import { environment } from '@environment/environment';

export const CATEGORY_API_URL = new InjectionToken<string>(environment.categoryApiUrl, {
  providedIn: 'root',
  factory: () => '/api',
  //factory: () => 'http://localhost:3001',
});
