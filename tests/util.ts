/**
 * Useful for subbing out requests.
 */
export function fakePromise(
  resolveWith: any,
  rejectWith: any = null
): Promise<any> {
  if (rejectWith) return Promise.reject(rejectWith);
  return Promise.resolve(resolveWith);
}
