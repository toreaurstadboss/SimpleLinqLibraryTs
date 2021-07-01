export { } //creating a module of below code
declare global {
  type predicate<T> = (arg: T) => boolean;
  type sortingValue<T> = (arg: T) => any;
  type keySelector<T> = (arg: T) => any;
  type resultSelector<T, TInner> = (arg: T, arg2: TInner) => any;
  interface Array<T> {
    AddRange<T>(itemsToAdd: T[]);
    InsertRange<T>(index: number, itemsToAdd: T[]);
    RemoveAt(index: number): T;
    RemoveWhere<T>(condition: predicate<T>): T[];
    FirstOrDefault<T>(condition: predicate<T>): T;
    SingleOrDefault<T>(condition: predicate<T>): T;
    First<T>(condition: predicate<T>): T;
    Single<T>(condition: predicate<T>): T;
    LastOrDefault<T>(condition: predicate<T>): T;
    Join<T, TInner>(otherArray: TInner[], outerKeySelector: keySelector<T>,
      innerKeySelector: keySelector<TInner>, res: resultSelector<T, TInner>): any[];
    Where<T>(condition: predicate<T>): T[];
    Count<T>(): number;
    CountBy<T>(condition: predicate<T>): number;
    Select<T>(...properties: (keyof T)[]): any[];
    GroupBy<T>(groupFunc: (arg: T) => string): any[];
    EnumerableRange(start: number, count: number): number[];
    Any<T>(condition: predicate<T>): boolean;
    Contains<T>(item: T): boolean;
    All<T>(condition: predicate<T>): boolean;
    MaxSelect<T>(property: (keyof T)): any;
    MinSelect<T>(property: (keyof T)): any;
    Average<T>(): number;
    AverageSelect<T>(property: (keyof T)): number;
    Max(): any;
    Min(): any;
    Sum(): any;
    Reverse<T>(): T[];
    Empty<T>(): T[];
    Except<T>(otherArray: T[]): T[];
    Intersect<T>(otherArray: T[]): T[];
    Union<T>(otherArray: T[]): T[];
    Cast<TOtherType>(TOtherType: Function): TOtherType[];
    TryCast<TOtherType>(TOtherType: Function): TOtherType[];
    GetProperties<T>(TClass: Function, sortProps: boolean): string[];
    Concat<T>(otherArray: T[]): T[];
    Distinct<T>(): T[];
    DistinctBy<T>(property: (keyof T)): any;
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
    ToDictionary<T>(keySelector: (arg: T) => string): any;
    TakeWhile<T>(condition: predicate<T>): T[];
    SkipWhile<T>(condition: predicate<T>): T[];
    Skip<T>(count: number): T[];
    defaultComparerSort<T>(x: T, y: T);
    ElementAt<T>(index: number);
    ElementAtOrDefault<T>(index: number);
    Aggregate<T>(accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any;
    AggregateSelect<T>(property: (keyof T), accumulator: any, currentValue: any, reducerFunc: (accumulator: any, currentValue: any) => any): any;
    Flatten<T>(otherArrays: T[][]): T[];
  }
}

if (!Array.prototype.Flatten) {
  Array.prototype.Flatten = function <T>(otherArrays: T[][] = null) {   
    let flattenedArrayOfThis = [...flatten(this, Infinity)];
    if (otherArrays == null || otherArrays == undefined) {
      return flattenedArrayOfThis;
    }
    return [...flattenedArrayOfThis, ...flatten(otherArrays, Infinity)];
  }
}

function* flatten(array, depth) {
  if (depth === undefined) {
    depth = 1;
  }
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      yield* flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}

if (!Array.prototype.AddRange) {
  Array.prototype.AddRange = function <T>(itemsToAdd: T[]) {
    if (this === null || this === undefined || itemsToAdd === null || itemsToAdd === undefined) {
      throw Error('AddRange failed. Check if array to add or this points to an undefined or null array.');
    }
    itemsToAdd.forEach(item => {
      this.push(item);
    });
  }
}

if (!Array.prototype.InsertRange) {
  Array.prototype.InsertRange = function InsertRange<T>(index: number, itemsToAdd: T[]) {
    if (this === null || this === undefined || itemsToAdd === null || itemsToAdd === undefined) {
      throw Error('AddRange failed. Check if array to add or this points to an undefined or null array.');
    }
    if (this.length < index - 1 || index < 0) {
      throw Error('Invalid operation. Index is out of bounds.');
    }
    let arrayKeepingItemsBeforeInsert = [];
    let deleteItems = 0;
    for (let i = index; i <= this.length; i++) {
      const element = this[i];
      if (element !== null && element !== undefined) {
        arrayKeepingItemsBeforeInsert.push(element);
        deleteItems++;
      }
    }
    this.splice(index, deleteItems);
    itemsToAdd.forEach(el => {
      this.push(el);
    });
    arrayKeepingItemsBeforeInsert.forEach(el => {
      this.push(el);
    });
  }

  if (!Array.prototype.RemoveAt) {
    Array.prototype.RemoveAt = function <T>(index: number): T {
      if (this === null || this === undefined) {
        throw Error('AddRange failed. Check if this array is undefined or null array.');
      }
      if (this.length < index || index < 0) {
        throw Error('Invalid operation. Index is out of bounds.');
      }
      const element = this[index];
      this.splice(index, 1);
      return element;
    }
  }

  if (!Array.prototype.RemoveWhere) {
    Array.prototype.RemoveWhere = function <T>(condition: predicate<T>): T[] {
      let matchingItems = [];
      let matchingItemsIndexes: number[] = [];
      let inputArray = this;
      let i = 0;
      inputArray = this.filter(item => {
        let returnItem = false;
        if (condition(item)) {
          matchingItems.push(item);
          matchingItemsIndexes.push(i);
          returnItem = true;
        }
        i++;
        if (returnItem)
          return matchingItems[matchingItems.length - 1];
      });
      let deleteOffset = 0;
      matchingItemsIndexes.forEach(indx => {
        this.splice(indx - deleteOffset, 1);
        deleteOffset++;
      });
      return matchingItems;
    }
  }

}








if (!Array.prototype.Join) {
  Array.prototype.Join = function <T, TInner>(otherArray: TInner[], outerKeySelector: keySelector<T>,
    innerKeySelector: keySelector<TInner>, res: resultSelector<T, TInner>): any[] {
    if (this === null || this === undefined || otherArray === null || otherArray === undefined) {
      return []; //return empty if undefined or null array(s)
    }
    let result: any[] = [];
    this.forEach(element => {
      let itemKey = outerKeySelector(element);
      otherArray.forEach(otherArrayElement => {
        let otherArrayItemKey = innerKeySelector(otherArrayElement);
        if (defaultCompare(itemKey, otherArrayItemKey)) {
          let itemToAdd = res(element, otherArrayElement);
          result.push(itemToAdd);
        }
      });
    });
    return result;
  }
}

if (!Array.prototype.GetProperties) {
  Array.prototype.GetProperties = function <T>(TClass: any = null, sortProps: boolean = false): string[] {
    if (TClass === null || TClass === undefined) {
      if (this === null || this === undefined || this.length === 0) {
        return []; //not possible to find out more information - return empty array
      }
    }
    // debugger
    if (TClass !== null && TClass !== undefined) {
      if (this !== null && this !== undefined) {
        if (this.length > 0) {
          let knownProps: string[] = Describer.describe(this[0]).Where(x => x !== null && x !== undefined);
          if (sortProps && knownProps !== null && knownProps !== undefined) {
            knownProps = knownProps.OrderBy(p => p);
          }
          return knownProps;
        }
        if (TClass !== null && TClass !== undefined) {
          let knownProps: string[] = Describer.describe(TClass).Where(x => x !== null && x !== undefined);
          if (sortProps && knownProps !== null && knownProps !== undefined) {
            knownProps = knownProps.OrderBy(p => p);
          }
          return knownProps;
        }
      }
    }
    return []; //give up..
  }
}

if (!Array.prototype.Cast) {
  Array.prototype.Cast = function <TOtherType>(TOtherType: Function): TOtherType[] {
    if (this === null || this === undefined) {
      return [];
    }
    let result = [];
    this.forEach(el => {
      let elementCasted = <TOtherType>el;
      //debugger
      let desc = Describer.describe(TOtherType, true);
      ObjectInitializer.initialize(desc, elementCasted);
      result.push(elementCasted);
    });
    return result;
  }
}

if (!Array.prototype.TryCast) {
  Array.prototype.TryCast = function <TOtherType>(TOtherType: Function): TOtherType[] {
    if (this === null || this === undefined) {
      return [];
    }
    let result = [];
    this.forEach(el => {
      try {
        let elementCasted = <TOtherType>el;
        //debugger
        let desc = Describer.describe(TOtherType, true);
        ObjectInitializer.initialize(desc, elementCasted);
        result.push(elementCasted);
      }
      catch (Error) {
        //swallow
      }
    });
    return result;
  }
}

if (!Array.prototype.Empty) {
  Array.prototype.Empty = function <T>(): T[] {
    if (this === undefined || this === null) {
      return [];
    }
    return this;
  }
}

if (!Array.prototype.Intersect) {
  Array.prototype.Intersect = function <T>(otherArray: T[]): T[] {
    if (this === undefined || this === null) {
      return [];
    }
    let result = this.Where(item => otherArray.Any(x => defaultCompare(x, item)));
    return result;
  }
}

if (!Array.prototype.Reverse) {
  Array.prototype.Reverse = function <T>(): T[] {
    if (this === null || this === undefined) {
      return [];
    }
    let result = this.reverse();
    return result;
  }
}

if (!Array.prototype.Except) {
  Array.prototype.Except = function <T>(otherArray: T[]): T[] {
    if (this === null || this === undefined || otherArray === null || otherArray === undefined) {
      return [];
    }
    let result = this.Where(item => !otherArray.Any(x => defaultCompare(x, item)));
    return result;
  }
}

if (!Array.prototype.Union) {
  Array.prototype.Union = function <T>(otherArray: T[]): T[] {
    if (this === null || this === undefined || otherArray === null || otherArray === undefined) {
      return [];
    }
    let result = this.Concat(otherArray);
    result = result.Distinct();
    return result;
  }
}

if (!Array.prototype.Concat) {
  Array.prototype.Concat = function <T>(otherArray: T[]): T[] {
    if (this === null || this === undefined || otherArray === null || otherArray === undefined) {
      return [];
    }
    let result = this.concat(otherArray);
    return result;
  }
}

if (!Array.prototype.Distinct) {
  Array.prototype.Distinct = function <T>(): T[] {
    if (this === null || this === undefined) {
      return [];
    }
    let distinctRunOnArray = this.filter((value, index, array) => array.indexOf(value) === index);
    return distinctRunOnArray;
  }
}

if (!Array.prototype.DistinctBy) {
  Array.prototype.DistinctBy = function <T>(property: (keyof T)): T[] {
    if (this === null || this === undefined) {
      return [];
    }
    let filteringArray = this.Select(property).map(n => n[property]);

    let distinctRunOnArray = this.filter((value, index, array) => {
      let valueProperty = value[property];
      return filteringArray.indexOf(valueProperty) === index;
    });
    return distinctRunOnArray;
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

if (!Array.prototype.Average) {
  Array.prototype.Average = function <T>(): number {
    if (this === null || this === undefined || this.length === 0)
      return null;
    if (this.Any(x => typeof x !== "number")) {
      throw Error('Can only calculate Average on arrays with only numeric items');
    }
    const reducerFunc = (accumulator, currentValue) => (accumulator + currentValue);
    let result = this.reduce(reducerFunc) / this.length;
    return result;
  }
}

if (!Array.prototype.AverageSelect) {
  Array.prototype.AverageSelect = function <T>(property: (keyof T)): number {
    if (this === null || this === undefined || this.length === 0)
      return null;
    //debugger
    if (this.Select(property).map(n => n[property]).Any(x => typeof x !== "number")) {
      throw Error('Can only calculate Average on arrays with only numeric items');
    }
    const reducerFunc = (accumulator, currentValue) => (accumulator + currentValue);
    let result = this.Select(property).map(n => n[property]).reduce(reducerFunc) / this.length;
    return result;
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
      if (otherArray.Any(item => defaultCompare(item, el))) {
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
    if (this === null || this === undefined) {
      return null;
    }
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    return matchingItems.length > 0 ? matchingItems[0] : null;
  }
}

if (!Array.prototype.First) {
  Array.prototype.First = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    if (matchingItems === null || matchingItems === undefined || matchingItems.length === 0) {
      throw Error('Invalid operation. No items found.');
    }
    return matchingItems[0];
  }
}

if (!Array.prototype.Single) {
  Array.prototype.Single = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    if (matchingItems === null || matchingItems === undefined || matchingItems.length === 0) {
      throw Error('Invalid operation. No items found.');
    }
    if (matchingItems.length > 1) {
      throw Error('Invalid operation. More than one items found.');
    }
    return matchingItems[0];
  }
}

if (!Array.prototype.SingleOrDefault) {
  Array.prototype.SingleOrDefault = function <T>(condition: predicate<T>): T {
    let matchingItems: T[] = this.filter((item: T) => {
      if (condition(item))
        return item;
    });
    if (matchingItems === null || matchingItems === undefined) {
      throw Error('Invalid operation. Got null or undefined.');
    }
    if (matchingItems.length > 1) {
      throw Error('Invalid operation. More than one items found.');
    }
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

if (!Array.prototype.Contains) {
  Array.prototype.Contains = function <T>(item: T): boolean {
    if (this.length === 0)
      return false;
    let result: boolean = false;
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      if (defaultCompare(item, element)) {
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


if (!Array.prototype.ToDictionary) {
  Array.prototype.ToDictionary = function <T>(keySelector: (arg: T) => any): any {
    let hash = {};
    this.map(item => {
      let key = keySelector(item);
      if (!(key in hash)) {
        hash[key] = item;
      }
      else {
        if (!(Array.isArray(hash[key]))) {
          hash[key] = [hash[key]];
        }
        hash[key].push(item);
      }
    });
    return hash;
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
  //return (obj).toString(); //JSON.stringify(obj) ?
  return JSON.stringify(obj);
};

const defaultCompare = function <T>(x: T, y: T) {
  let resultCompare = [].defaultComparerSort(x, y);
  return resultCompare === 0 ? true : false;
}

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

class Describer {

  private static FRegEx = new RegExp(/(?:this\.)(.+?(?= ))/g);
  static describe(val: any, parent = false, childPropertyPath: string = ""): string[] {
    let isFunction = Object.prototype.toString.call(val) == '[object Function]';
    if (isFunction) {
      let result = [];
      if (parent) {
        var proto = Object.getPrototypeOf(val.prototype);
        if (proto) {
          result = result.concat(this.describe(proto.constructor, parent));
        }
      }
      result = result.concat(val.toString().match(this.FRegEx));
      result = result.Where(r => r !== null && r !== undefined);
      return result;
    }
    else {
      if (typeof val == "object") {
        let knownProps: string[] = Object.getOwnPropertyNames(val);
        var childProperties = knownProps.filter(prop => typeof val[prop] == "object").map(
          propName => this.getChildProperties(val[propName], propName)
            .map(childPropertyName => this.getChildPropertyPath(propName, childPropertyName))
        );
        console.log('knownProps', knownProps);
        for (var i = 0; i < childProperties.length; i++) {
          console.log('childProperties[' + i + ']', childProperties[i]);
          knownProps.AddRange(childProperties[i]);
        }
        console.log('knownProps', knownProps);
        return knownProps;
      }
    }
    return val !== null ? [val.toString()] : [];
  }

  static getChildPropertyPath(childPropertyPath, childPropertyName) {
    return childPropertyPath + "." + childPropertyName;
  }

  static getChildProperties(val, childPropertyPath): string[] {
    if (typeof val == "object") {
      let childPropertyName = Describer.describe(val, false, childPropertyPath + '.' + childPropertyPath);
      return childPropertyName;
    }
    return [];

  }
}

class ObjectInitializer {

  static initialize(properties: string[], inputObject: any): void {
    properties.forEach(prop => {
      let adjustedProp = prop.replace("this.", "");
      if (inputObject[adjustedProp] === undefined) {
        if (adjustedProp.indexOf(".") >= 0) {
          let components = adjustedProp.split('.');
          let propertyObject = inputObject[components[0]];
          if (components.Count() > 0 && propertyObject !== undefined) {
            let subproperties = Object.keys(inputObject[components[0]]);
            this.initialize(subproperties, propertyObject);
          }
        }
        else {
          //the property is missing
          inputObject[adjustedProp] = null;
        }
      }
    });

  }

}







