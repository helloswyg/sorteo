// TODO: This should not take data, but return the reduce function for this:
// TODO: There's groupBy and mapBy: Record<string, any[]> VS Record<string, any>

/*
export function groupBy<T = {}>(
  data: T[],
  groupByFunction: (itemData: T) => string,
): GroupsArray<T> {
  const groups: Map<string, T[]> = new Map();

  data.forEach((itemData) => {
    const key = groupByFunction(itemData);
    const value = groups.get(key) || [];

    if (!groups.has(key)) {
      groups.set(key, value);
    }

    value.push(itemData);
  });

  return Array.from(groups.entries());
}
*/
