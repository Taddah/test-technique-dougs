import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CATEGORY_API_URL } from '@core/tokens/category-api-url.token';
import { CategoryWebService } from '@core/webservices/category.webservice';
import { Category, VisibleCategory } from '@core/models/category.model';

describe('CategoryService', () => {
  let service: CategoryWebService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://test-api.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting,
        CategoryWebService,
        { provide: CATEGORY_API_URL, useValue: mockApiUrl },
      ],
    });

    service = TestBed.inject(CategoryWebService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCategories', () => {
    it('should fetch all categories from the correct URL', () => {
      const mockCategories: Category[] = [
        { id: 1, wording: '1', description: 'description 1' },
        { id: 2, wording: '2', description: 'description 2' },
      ];

      service.getAllCategories().subscribe((categories) => {
        expect(categories).toEqual(mockCategories);
        expect(categories.length).toBe(2);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/all-categories`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);
    });
  });

  describe('getVisibleCategories', () => {
    it('should fetch visible categories', () => {
      const mockVisible: VisibleCategory[] = [{ id: 1 }];

      service.getVisibleCategories().subscribe((data) => {
        expect(data).toEqual(mockVisible);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/visible-categories`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVisible);
    });
  });
});
