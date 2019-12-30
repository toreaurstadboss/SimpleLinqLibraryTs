export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  type sortingValue<T> = (arg: T) => any;
  interface Array<T> {
    FirstOrDefault<T>(condition: predicate<T>): T;
    LastOrDefault<T>(condition: predicate<T>): T;
    Where<T>(condition: predicate<T>): T[];
    Select<T>(...properties: (keyof T)[]): any[];
    GroupBy<T>(groupFunc: (arg: T) => string): any[];
    EnumerableRange(start: number, count: number): number[];
    Any<T>(condition: predicate<T>): boolean;
    All<T>(condition: predicate<T>): boolean;
    MaxSelect<T>(property: (keyof T)): number;
    Max(): number;
    OrderBy<T>(sortMember: sortingValue<T>): T[];
    ThenBy<T>(sortMember: sortingValue<T>): T[];
    OfType<T>(compareObject: T): T[];
    EqualTo<T>(compareArray: T): boolean;
    Take<T>(count: number): T[];
    Skip<T>(count: number): T[];
  }
}

if (!Array.prototype.Take) {
  Array.prototype.Take = function <T>(count: number): T[] {
    if (!Array.isArray(this))
      throw Error('The object this must be of type array!');
    let clonedArray = [...this];
    let result: T[] = [];
    for (let index = 0; index < count; index++) {
      if (index >= clonedArray.length)
        break;
      result.push(clonedArray[index]);
    }
    return result;
  }
}

if (!Array.prototype.Skip) {
  Array.prototype.Skip = function <T>(count: number): T[] {
    if (!Array.isArray(this))
      throw Error('The object this must be of type array!');
    let clonedArray = [...this];
    let result: T[] = [];
    for (let index = count; index < this.length; index++) {
      result.push(clonedArray[index]);
    }
    return result;
  }
}

if (!Array.prototype.EqualTo) {
  Array.prototype.EqualTo = function <T>(compareArray: T): boolean {
    if (!Array.isArray(this) || !Array.isArray(compareArray) || this.length !== compareArray.length)
      return false;
    var arr1 = this.concat().sort();
    var arr2 = compareArray.concat().sort();
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
}

if (!Array.prototype.OrderBy) {
  Array.prototype.OrderBy = function <T>(sortMember: sortingValue<T>): T[] {
    let result = this.sort(function (a, b) {
      let aValue = sortMember(a);
      let bValue = sortMember(b);
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
    return result;
  }
}

function isOfSimilarShape<T>(input: any, compareObject: T): boolean {
  if (input === undefined || input === null || compareObject === undefined || compareObject === null)
    return false;

  let propsOfInput = Object.keys(input);
  let propsOfCompareObject = Object.keys(compareObject);
  //debugger
  let sameShapeOfInputAndCompareObject = propsOfInput.EqualTo(propsOfCompareObject);
  return sameShapeOfInputAndCompareObject;
}

if (!Array.prototype.OfType) {
  Array.prototype.OfType = function <T>(compareObject: T): T[] {
    let result: T[] = [];
    this.forEach(el => {
      //debugger
      let t: T = null;
      if (isOfSimilarShape(el, compareObject))
        result.push(el);
    });
    return result;
  }
}

if (!Array.prototype.ThenBy) {
  Array.prototype.ThenBy = function <T>(sortMember: sortingValue<T>): T[] {
    //let inputArray = arguments.callee.caller;
    if (!Array.isArray(this)) {
      throw Error('Input array must be actually an array!');
    }
    return this.OrderBy(sortMember);
    //return inputArray.OrderBy<T>(sortMember); //same implementation
  }
}

if (!Array.prototype.MaxSelect) {
  Array.prototype.MaxSelect = function <T>(property: (keyof T)): number {
    let result: number = Number.MIN_VALUE;
    this.forEach(element => {
      let elementValue = element[property];
      if (typeof elementValue !== 'number')
        throw Error('The provided property is not of type number! ' + property);
      if (result < element[property])
        result = element[property];
    });
    return result;
  }
}

if (!Array.prototype.Max) {
  Array.prototype.Max = function (): number {
    let result: number = Number.MIN_VALUE;
    this.forEach(element => {
      if (typeof element !== 'number')
        throw Error('The provided array contains element that is not of type number! ');
      if (result < element)
        result = element;
    });
    return result;
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

if (!Array.prototype.Any) {
  Array.prototype.Any = function <T>(condition: predicate<T>): boolean {
    if (this.length === 0)
      return false;
    let result: boolean = false;
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      if (condition(element)) {
        result = true;
        break;
      }
    }
    return result;
  }
}

if (!Array.prototype.All) {
  Array.prototype.All = function <T>(condition: predicate<T>): boolean {
    if (this.length === 0)
      return false;
    let result: boolean = true;
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      if (!condition(element)) {
        result = false;
      }
    }
    return result;
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






