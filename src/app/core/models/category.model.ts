export interface Category {
  id: number;
  group?: CategoryGroup;
  wording: string;
  description: string;
}

export interface CategoryGroup {
  id: number;
  name: string;
  color: string;
}

export type CategoryGroupWithPillColor = CategoryGroup & {
  pillColor: string;
};

export interface VisibleCategory {
  id: number;
}
