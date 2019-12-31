export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  type sortingValue<T> = (arg: T) => any;
  interface Array<T> {
    FirstOrDefault<T>(condition: predicate<T>): T;
    LastOrDefault<T>(condition: predicate<T>): T;
    Where<T>(condition: predicate<T>): T[];
    Count<T>(): number;
    CountBy<T>(condition: predicate<T>): number;
    Select<T>(...properties: (keyof T)[]): any[];
    GroupBy<T>(groupFunc: (arg: T) => string): any[];
    EnumerableRange(start: number, count: number): number[];
    Any<T>(condition: predicate<T>): boolean;
    All<T>(condition: predicate<T>): boolean;
    MaxSelect<T>(property: (keyof T)): any;
    MinSelect<T>(property: (keyof T)): any;
    Max(): any;
    Min(): any;
    Sum(): any;
    SumSelect<T>(property: (keyof T)): any;
    Intersect<T>(otherArray: T[]): T[];
    IntersectSelect<T>(property: (keyof T), otherArray: T[]): T[];
    MinSelect<T>(property: (keyof T)): any;
    OrderBy<T>(sortMember: sortingValue<T>): T[];
    OrderByDescending<T>(sortMember: sortingValue<T>): T[];
    ThenBy<T>(sortMember: sortingValue<T>): T[];
    OfType<T>(compareObject: T): T[];
    SequenceEqual<T>(compareArray: T): boolean;
    Take<T>(count: number): T[];
    TakeWhile<T>(condition: predicate<T>): T[];
    SkipWhile<T>(condition: predicate<T>): T[];
    Skip<T>(count: number): T[];
    defaultComparerSort<T>(x: T, y: T);
    ElementAt<T>(index: number);
    ElementAtOrDefault<T>(index: number);
    Aggregate<T>(accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any;
    AggregateSelect<T>(property: (keyof T), accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any;
  }
}

if (!Array.prototype.CountBy) {
  Array.prototype.CountBy = function <T>(condition: predicate<T>): number {
    if (this === null || this === undefined)
      return 0;
    let result = 0;
    this.forEach(el => {
      if (condition(el)) {
        result++;
      }
    });
    return result;
  }
}

if (!Array.prototype.Count) {
  Array.prototype.Count = function <T>(): number {
    return this !== null && this !== undefined ? this.length : 0;
  }
}

if (!Array.prototype.Aggregate) {
  Array.prototype.Aggregate = function <T>(accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any {
    //debugger
    if (reducerFunc === undefined || reducerFunc === null) {
      reducerFunc = (accumulator, currentValue) => accumulator + currentValue;
    }
    let result = this.reduce(reducerFunc);
    return result;
  }
}

if (!Array.prototype.AggregateSelect) {
  Array.prototype.AggregateSelect = function <T>(property: (keyof T), accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any {
    //debugger
    if (reducerFunc === undefined || reducerFunc === null) {
      reducerFunc = (accumulator, currentValue) => accumulator + currentValue;
    }
    //debugger
    let result = this.Select(property).map(n => n[property]).reduce(reducerFunc);
    return result;
  }
}

if (!Array.prototype.Intersect) {
  Array.prototype.Intersect = function <T>(otherArray: T[]): T[] {
    if (otherArray === undefined || otherArray === null)
      return [];
    if (this === undefined || this === null)
      return [];
    let result = [];
    this.forEach(el => {
      if (otherArray.Any(item => item == el)) {
        result.push(el);
      }
    });
    return result;
  }
}

if (!Array.prototype.IntersectSelect) {
  Array.prototype.IntersectSelect = function <T>(property: (keyof T), otherArray: T[]): T[] {
    if (otherArray === undefined || otherArray === null)
      return [];
    if (this === undefined || this === null)
      return [];
    let result = [];
    this.forEach(el => {
      let itemValue = el[property];
      if (otherArray.Select(property).map(n => n[property]).Any(x => x == itemValue)) {
        result.push(el);
      }
    });
    return result;
  }
}

if (!Array.prototype.ElementAt) {
  Array.prototype.ElementAt = function <T>(index: number) {
    if (index < 0)
      throw Error('Index must be a positive number!');
    if (index > this.length) {
      throw Error('Index must not be out of bounds! Max length is: ' + index);
    }
    return this[index];
  }
}

if (!Array.prototype.ElementAtOrDefault) {
  Array.prototype.ElementAt = function <T>(index: number) {
    if (index < 0)
      throw Error('Index must be a positive number!');
    if (index > this.length) {
      return null;
    }
    return this[index];
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

if (!Array.prototype.TakeWhile) {
  Array.prototype.TakeWhile = function <T>(condition: predicate<T>): T[] {
    if (!Array.isArray(this))
      throw Error('The object this must be of type array!'); //this should not occur..
    if (this === null || this === undefined || this.length === 0)
      return [];
    let clonedArray = [...this];
    let result: T[] = [];
    for (let index = 0; index < clonedArray.length; index++) {
      if (condition(this[index]))
        result.push(clonedArray[index]);
      else
        break; //takewhile - exit if condition no longer is viable
    }
    return result;
  }
}

if (!Array.prototype.SkipWhile) {
  Array.prototype.SkipWhile = function <T>(condition: predicate<T>): T[] {
    if (!Array.isArray(this))
      throw Error('The object this must be of type array!'); //this should not occur..
    if (this === null || this === undefined || this.length === 0)
      return [];
    let clonedArray = [...this];
    let result: T[] = [];
    for (let index = 0; index < clonedArray.length; index++) {
      if (condition(this[index]))
        continue;
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

if (!Array.prototype.SequenceEqual) {
  Array.prototype.SequenceEqual = function <T>(compareArray: T): boolean {
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
      let sortValue = Array.prototype.defaultComparerSort(aValue, bValue);
      return sortValue;
    });
    return result;
  }
}

if (!Array.prototype.OrderByDescending) {
  Array.prototype.OrderByDescending = function <T>(sortMember: sortingValue<T>): T[] {
    let result = this.sort(function (a, b) {
      let aValue = sortMember(a);
      let bValue = sortMember(b);
      let sortValue = -1 * Array.prototype.defaultComparerSort(aValue, bValue);
      return sortValue;
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
  let sameShapeOfInputAndCompareObject = propsOfInput.SequenceEqual(propsOfCompareObject);
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
  Array.prototype.MaxSelect = function <T>(property: (keyof T)): any {
    let result = this.Select(property).map(n => n[property]).sort(this.defaultComparerSort).LastOrDefault(x => x);
    return result;
  }
}

if (!Array.prototype.Max) {
  Array.prototype.Max = function <T>(): any {
    if (!Array.isArray(this)) {
      throw Error('Input array (this) must be actually an array!');
    }
    let result = this.sort(this.defaultComparerSort).LastOrDefault(x => x);
    return result;
  }
}

if (!Array.prototype.MinSelect) {
  Array.prototype.MinSelect = function <T>(property: (keyof T)): any {
    let result = this.Select(property).map(n => n[property]).sort(this.defaultComparerSort).FirstOrDefault(x => x);
    return result;
  }
}

if (!Array.prototype.Min) {
  Array.prototype.Min = function <T>(): any {
    if (!Array.isArray(this)) {
      throw Error('Input array (this) must be actually an array!');
    }
    let result = this.sort(this.defaultComparerSort).FirstOrDefault(x => x);
    return result;
  }
}

if (!Array.prototype.Sum) {
  Array.prototype.Sum = function <T>(): any {
    if (!Array.isArray(this)) {
      throw Error('Input array (this) must be actually an array!');
    }
    let result = this.Aggregate(0, 0, null);
    return result;
  }
}

if (!Array.prototype.SumSelect) {
  Array.prototype.SumSelect = function <T>(property: (keyof T)): any {
    if (!Array.isArray(this)) {
      throw Error('Input array (this) must be actually an array!');
    }
    let result = this.Select(property).map(n => n[property]).Aggregate(0, 0, null);
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


const toStringItem = obj => {
  //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-tostring

  if (obj === null)
    return "null";

  if (typeof obj === "boolean" || typeof obj === "number")
    return obj;

  if (typeof obj === "string")
    return obj;

  if (typeof obj === "symbol")
    throw new TypeError();

  //we know we have an object. perhaps return JSON.stringify?
  return (obj).toString(); //JSON.stringify(obj) ?
};

if (!Array.prototype.defaultComparerSort) {
  Array.prototype.defaultComparerSort = function <T>(x: T, y: T) {
    //INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare

    if (x === undefined && y === undefined)
      return 0;

    if (x === undefined)
      return 1;

    if (y === undefined)
      return -1;

    const xString = toStringItem(x);
    const yString = toStringItem(y);

    if (xString < yString)
      return -1;

    if (xString > yString)
      return 1;

    return 0;
  }

}







