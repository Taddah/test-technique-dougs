import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CategoryPageService } from '@features/category-page/category-page.service';
import { CategorySelectors } from '@store/category/category.selectors';
import { Category, CategoryGroup } from '@core/models/category.model';
import { signal } from '@angular/core';

vi.mock('@ui/pill/pill-color', () => ({
  getPillColor: vi.fn((color: string) => `pill-${color || 'default'}`),
}));

describe('CategoryPageService', () => {
  let service: CategoryPageService;
  let routerMock: Partial<Router>;
  let queryParamMapSubject: BehaviorSubject<ParamMap>;

  const mockGroups: CategoryGroup[] = [
    { id: 2, name: 'Z Group', color: 'blue' },
    { id: 1, name: 'A Group', color: 'red' },
  ];

  const mockCategories: Category[] = [
    { id: 1, wording: 'Zebra', group: mockGroups[0] },
    { id: 2, wording: 'Apple', group: mockGroups[1] },
    { id: 3, wording: 'Banana', group: undefined },
    { id: 4, wording: 'Apple Pie', group: mockGroups[1] },
  ] as Category[];

  beforeEach(() => {
    routerMock = {
      navigate: vi.fn(),
    };

    queryParamMapSubject = new BehaviorSubject(convertToParamMap({}));

    const storeMock = {
      selectSignal: vi.fn((selector) => {
        if (selector === CategorySelectors.visibleCategories) return signal(mockCategories);
        if (selector === CategorySelectors.categoryGroups) return signal(mockGroups);
        if (selector === CategorySelectors.isLoading) return signal(false);
        if (selector === CategorySelectors.error) return signal(null);
        return signal(null);
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        CategoryPageService,
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: queryParamMapSubject.asObservable() },
        },
      ],
    });

    service = TestBed.inject(CategoryPageService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('init', () => {
    it('shouldbe created', () => {
      expect(service).toBeTruthy();
    });

    it('should get data from store', () => {
      expect(service.isLoading()).toBe(false);
      expect(service.error()).toBeNull();
    });
  });

  describe('addFiltersToQueryParams', () => {
    it('should navigate with query params', () => {
      service.addFiltersToQueryParams('test', 1);

      expect(routerMock.navigate).toHaveBeenCalledWith([], {
        relativeTo: expect.anything(),
        queryParams: { search: 'test', group: 1 },
        queryParamsHandling: 'merge',
      });
    });
  });

  describe('getCategoriesByAlphabet', () => {
    it('should return categories sorted by wording', () => {
      const result = service.getCategoriesByAlphabet();

      expect(result.length).toBe(4);
      expect(result[0].wording).toBe('Apple');
      expect(result[1].wording).toBe('Apple Pie');
      expect(result[2].wording).toBe('Banana');
      expect(result[3].wording).toBe('Zebra');
    });

    it('should filter by group', () => {
      queryParamMapSubject.next(convertToParamMap({ group: '1' }));
      TestBed.tick();

      const result = service.getCategoriesByAlphabet();

      expect(result.length).toBe(2);
      expect(result.every((c) => c.group?.id === 1)).toBe(true);
    });

    it('should filter by text', () => {
      queryParamMapSubject.next(convertToParamMap({ search: 'apple' }));
      TestBed.tick();

      const result = service.getCategoriesByAlphabet();

      expect(result.length).toBe(2);
      expect(result[0].wording).toBe('Apple');
      expect(result[1].wording).toBe('Apple Pie');
    });
  });

  describe('getCategoriesGrouped', () => {
    it('should group categories by group', () => {
      const resultMap = service.getCategoriesGrouped();
      const groups = Array.from(resultMap.keys());

      expect(groups.length).toBe(3);

      const sansGroupeKey = groups.find((g) => g.id === 0);
      expect(sansGroupeKey).toBeDefined();
      expect(sansGroupeKey?.name).toBe('Sans groupe');
      expect(resultMap.get(sansGroupeKey!)?.length).toBe(1);
      expect(resultMap.get(sansGroupeKey!)![0].wording).toBe('Banana');
    });

    it('should filter before grouping', () => {
      queryParamMapSubject.next(convertToParamMap({ search: 'zebra' }));
      TestBed.tick();

      const resultMap = service.getCategoriesGrouped();
      const groups = Array.from(resultMap.keys());

      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('Z Group');
      expect(resultMap.get(groups[0])?.length).toBe(1);
    });
  });

  describe('dropdownOptions', () => {
    it('should return dropdown options ordered by name with all categories at top', () => {
      const options = service.dropdownOptions();

      expect(options.length).toBe(3);
      expect(options[0]).toEqual({ value: '', label: 'Tous les groupes de catégories' });
      expect(options[1]).toEqual({ value: '1', label: 'A Group' });
      expect(options[2]).toEqual({ value: '2', label: 'Z Group' });
    });
  });

  describe('showSelectedCategory', () => {
    it('shouldlog specific message if no category selected', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        /* intentionally empty */
      });
      service.selectedCategoryId.set(null);

      service.showSelectedCategory();

      expect(consoleSpy).toHaveBeenCalledWith('Pas de catégorie sélectionnée');
      consoleSpy.mockRestore();
    });

    it('should log selected categories', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        /* intentionally empty */
      });
      service.selectedCategoryId.set(1);

      service.showSelectedCategory();

      expect(consoleSpy).toHaveBeenCalledWith(mockCategories[0]);
      consoleSpy.mockRestore();
    });
  });
});
