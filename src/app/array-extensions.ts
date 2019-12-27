export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  interface Array<T> {
    FirstOrDefault<T>(condition: predicate<T>): T;
    Where<T>(condition: predicate<T>): T[];
  }
}

Array.prototype.FirstOrDefault = function <T>(condition: predicate<T>): T {
  let matchingMovies: T[] = this.filter((item: T) => {

    if (condition(item)) {
      return item;
    }
  });
  if (matchingMovies.length > 0) {
    return matchingMovies[0];
  }
  return null;
}

Array.prototype.Where = function <T>(condition: predicate<T>): T[] {
  let result: T[] = [];
  let matchingMovies: T[] = this.filter((item: T) => {

    if (condition(item)) {
      result.push(item);
    }
  });
  return result;
}






