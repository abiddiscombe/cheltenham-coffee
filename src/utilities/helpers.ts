export function conditionallyInclude<T>(
  condition: boolean,
  content: T,
): [T] | [] {
  // Makes it easy to conditionally append items to
  // an array. Simply call this function with the
  // spread syntax to add a new array item.
  return condition ? [content] : [];
}
