// TODO: This should not take data, but return the reduce function for this:

/*
export function distinctBy<V extends Record<string, any> = Record<string, any>>(array: V[], key: keyof V): V[] {
  const map = new Map(array.map(item => [item[key], item]));

  return Array.from(map.values());
}
*/
