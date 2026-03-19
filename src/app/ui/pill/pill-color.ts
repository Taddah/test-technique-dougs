export const PILL_COLORS = ['blue', 'red', 'yellow', 'purple', 'pink', 'green'];
export type PillColor = (typeof PILL_COLORS)[number];

export function getPillColor(color: string): PillColor {
  if (!color) return PILL_COLORS[0];

  if (color.startsWith('m-')) {
    const colorWithoutPrefix = color.replace('m-', '');

    if (isPillColor(colorWithoutPrefix)) {
      return colorWithoutPrefix;
    }
  }

  if (isPillColor(color)) return color;

  return PILL_COLORS[0];
}

export function isPillColor(value: string | null | undefined): value is PillColor {
  return !!value && PILL_COLORS.includes(value as PillColor);
}
