import { InjectionToken } from '@angular/core';
import { environment } from '@environment/environment';

// Token pour l'URL de base de l'API
export const CATEGORY_API_URL = new InjectionToken<string>(environment.categoryApiUrl, {
  providedIn: 'root',
  factory: () => 'http://localhost:3001',
});
