export type SortVariant = 'number' | 'string';

export type CompareFunction<T> = (a: T, b: T) => number;

export enum SortDirection { Ascending = 1, Descending = -1 }

export interface SortParams {
  sortBy: string;
  sortDirection: SortDirection;
}

export function getCompareByNumberFn<T>(
  getValue: (x: T) => number,
  sortDirection: SortDirection = SortDirection.Ascending,
  fallback?: CompareFunction<T>,
): CompareFunction<T> {
  return (a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);
    const isNumberA = !isNaN(valueA);
    const isNumberB = !isNaN(valueB);

    if (isNumberA && isNumberB) return (sortDirection * (valueA - valueB)) || (fallback ? fallback(a, b) : 0);

    // NaN always at the end (independently of sort direction):
    if (isNumberA) return -1;
    if (isNumberB) return 1;

    // TODO: Make this configurable:
    // NaN at the end if DESC, otherwise at the beginning:
    // if (isNumberA) return sortDirection;
    // if (isNumberB) return -sortDirection;

    return sortDirection * (fallback ? fallback(a, b) : 0);
  };
}

export function getCompareByStringFn<T>(
  getValue: (x: T) => string,
  sortDirection: SortDirection = SortDirection.Ascending,
  fallback?: CompareFunction<T>,
): CompareFunction<T> {
  return (a, b) => {
    return sortDirection * (getValue(a).localeCompare(getValue(b)) || (fallback ? fallback(a, b) : 0));
  };
}

export function getCompareByDateFn<T>(
  getValue: (x: T) => Date,
  sortDirection: SortDirection = SortDirection.Ascending,
  fallback?: CompareFunction<T>,
): CompareFunction<T> {
  return (a, b) => {
    const dateA = getValue(a);
    const dateB = getValue(b);
    const isDateA = dateA.toString() !== 'Invalid Date';
    const isDateB = dateB.toString() !== 'Invalid Date';

    if (isDateA && isDateB) return sortDirection * ((getValue(a).getTime() - getValue(b).getTime()) || (fallback ? fallback(a, b) : 0))

    // NaN always at the end (independently of sort direction):
    if (isDateA) return -1;
    if (isDateB) return 1;

    // TODO: Make this configurable:
    // NaN at the end if DESC, otherwise at the beginning:
    // if (isDateA) return sortDirection;
    // if (isDateB) return -sortDirection;

    return sortDirection * (fallback ? fallback(a, b) : 0);
  };
}

