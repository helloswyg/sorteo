# sorteo

👯 **Easily sort an array of objects** with multiple criteria.

⚡ Combine it with `@swyg/memo` for blazing fast performance!

⚠️ Not to be confused with the Spanish word "sorteo": https://m.interglot.com/es/en/Sorteo


<br>


Installation
------------

    npm install @swyg/sorteo

    yarn install @swyg/sorteo

<br>


Usage
-----

**Functions:**

- `getCompareByStringFn<T>(getValue: (x: T) => string, sortDirection: SortDirection = SortDirection.Ascending, fallback?: CompareFunction<T>): CompareFunction<T>`
- `getCompareByNumberFn<T>(getValue: (x: T) => number, sortDirection: SortDirection = SortDirection.Ascending, fallback?: CompareFunction<T>): CompareFunction<T>`
- `getCompareByDateFn<T>(getValue: (x: T) => Date, sortDirection: SortDirection = SortDirection.Ascending, fallback?: CompareFunction<T>): CompareFunction<T>`

<br>


TODO
----

- Configure how `NaN`, `undefined`, `null` and/or `''` are handled (e.g. always at the end, always at the start, depending on order param...).
- Add `getCompareByFns<T>(compareFunctions: CompareFunction<T>[])`
- Add groupBy, mapBy (like groupBy but single-value) distinctBy, sortBy.
- All functions have a version that return a function to be used in Array.sort, Array.reduce or Array.filter, or a function that just takes an array as param.
