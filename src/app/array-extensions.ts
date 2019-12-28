export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  interface Array<T> {
    FirstOrDefault<T>(condition: predicate<T>): T;
    Where<T>(condition: predicate<T>): T[];
    Select<T>(...properties: (keyof T)[]): any[];
  }
}

if (!Array.prototype.FirstOrDefault) {
  Array.prototype.FirstOrDefault = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {

      if (condition(item)) {
        return item;
      }
    });
    if (matchingItems.length > 0) {
      return matchingItems[0];
    }
    return null;
  }
}

if (!Array.prototype.Select) {
  Array.prototype.Select = function <T>(...properties: (keyof T)[]): any[] {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      let item: any = {};
      for (let j = 0; j < properties.length; j++) {
        let key = properties[j];
        item[key] = this[i][properties[j]];
      }
      result.push(item);
    }
    return result;
  }
}


if (!Array.prototype.Where) {
  Array.prototype.Where = function <T>(condition: predicate<T>): T[] {

    let matchingItems: T[] = this.filter((item: T) => {

      if (condition(item)) {
        return true;
      }
    });
    return matchingItems;
  }
}






