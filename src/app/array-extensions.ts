export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  interface Array<T> {
    FirstOrDefault<T>(condition: predicate<T>): T;
    LastOrDefault<T>(condition: predicate<T>): T;
    Where<T>(condition: predicate<T>): T[];
    Select<T>(...properties: (keyof T)[]): any[];
    GroupBy<T>(groupFunc: (arg: T) => string): any[];
    EnumerableRange(start: number, count: number): number[];
  }
}

if (!Array.prototype.FirstOrDefault) {
  Array.prototype.FirstOrDefault = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    return matchingItems.length > 0 ? matchingItems[0] : null;
  }
}

if (!Array.prototype.LastOrDefault) {
  Array.prototype.LastOrDefault = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    return matchingItems.length > 0 ? matchingItems[matchingItems.length - 1] : null;
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

if (!Array.prototype.GroupBy) {
  Array.prototype.GroupBy = function <T>(groupFunc: (arg: T) => string): any[] {
    let groups: any = {};
    this.forEach(el => {
      let itemKeyValue: any = groupFunc(el);
      if (itemKeyValue in groups === false) {
        groups[itemKeyValue] = [];
      }
      groups[itemKeyValue].push(el);
    });
    let result = Object.keys(groups).map(key => {
      return {
        key: key,
        values: groups[key]
      }
    });
    return result;
  }
}

function* Range(start, count) {
  for (let x = start; x < start + count; x++) {
    yield x;
  }
}

if (!Array.prototype.EnumerableRange) {
  Array.prototype.EnumerableRange = function (start: number, count: number): number[] {
    let generatedRange = [...Range(start, count)];
    return generatedRange;
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






