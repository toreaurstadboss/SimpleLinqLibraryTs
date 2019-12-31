import { StarWarsMovies } from "./starwarsmovies";
import { Movie } from './movie';

class SomeClass {
  Num: number;
  Name: string;
}

class SomeOtherClass {
  SomeOtherNum: number;
  SomeName: string;
}

describe('Array Extensions tests for TsExtensions Linq esque library', () => {

  it('can aggregate items to expected result using Aggregate on array of items of numbers', () => {
    let someNums = [1, 2, 3, 4];
    let result = someNums.Aggregate(0, 0, null);
    expect(result).toBe(10);
  });

  it('can sum items to expected result using Sum on array of items of numbers', () => {
    let someNums = [1, 2, 3, 4, 14];
    let result = someNums.Aggregate(0, 0, null);
    expect(result).toBe(24);
  });

  it('can sum items to expected result using SumSelect on array of items of numbers', () => {
    let someArray: any[] = [];
    someArray.push(<SomeClass>{ Name: "Foo", Num: 1 });
    someArray.push(<SomeClass>{ Name: "FooBaz", Num: 4 });
    someArray.push(<SomeClass>{ Name: "AllyoBaze", Num: 7 });
    let result = someArray.SumSelect<SomeClass>("Num");
    expect(result).toBe(12);
  });

  it('can count items to expected result using Count on array of items of numbers', () => {
    let someNums = [1, 2, 3, 4];
    let result = someNums.Count();
    expect(result).toBe(4);
  });

  it('can count items by condition to expected using CountBy result on array of items of numbers', () => {
    let someNums = [1, 2, 3, 4];
    let result = someNums.CountBy<any>(x => x % 2 === 0);
    expect(result).toBe(2);
  });

  it('can aggregate items and project to expected result using AggregateSeelct on array of items of objects', () => {
    let someArray: any[] = [];
    someArray.push(<SomeClass>{ Name: "Foo", Num: 1 });
    someArray.push(<SomeClass>{ Name: "FooBaz", Num: 4 });
    someArray.push(<SomeClass>{ Name: "AllyoBaze", Num: 7 });
    let result = someArray.AggregateSelect<SomeClass>("Num", 0, 0, null);
    expect(result).toBe(12);
  });

  it('can take two items using Take(2)', () => {
    let starwarsMovies = StarWarsMovies;
    let firstTwoMovies = starwarsMovies.Take<Movie>(2).Select<Movie>("title").map(m => m.title);
    expect(firstTwoMovies[0].toLowerCase()).toContain("phantom menace");
    expect(firstTwoMovies[1].toLowerCase()).toContain("attack of the clones");
  });

  it('can take two items using Skip(4)', () => {
    let starwarsMovies = StarWarsMovies;
    let lastTwoMovies = starwarsMovies.Skip<Movie>(4).Select<Movie>("title").map(m => m.title);
    expect(lastTwoMovies[0].toLowerCase()).toContain("empire strikes back");
    expect(lastTwoMovies[1].toLowerCase()).toContain("return of the jedi");
  });

  it('can take next last movie using Skip(4).Take(1)', () => {
    let starwarsMovies = StarWarsMovies;
    let fiftMovie = starwarsMovies.Skip<Movie>(4).Take(1).Select<Movie>("title").map(m => m.title);
    expect(fiftMovie[0].toLowerCase()).toContain("empire strikes back");
    expect(fiftMovie.length).toBe(1);

  });

  it('can find desired items using OfType of type T', () => {
    let someMixedArray: any[] = [];
    someMixedArray.push(<SomeClass>{ Name: "Foo", Num: 1 });
    someMixedArray.push(<SomeOtherClass>{ SomeName: "BarBazBaze", SomeOtherNum: 813 });
    someMixedArray.push(<SomeClass>{ Name: "FooBaz", Num: 4 });
    someMixedArray.push(<SomeOtherClass>{ SomeName: "BarBaze", SomeOtherNum: 13 });
    someMixedArray.push(<SomeClass>{ Name: "AllyoBaze", Num: 7 });

    let compareObject = <SomeClass>{ Name: "", Num: 0 };
    let filteredArrayBySpecifiedType = someMixedArray.OfType(compareObject);
    console.log(filteredArrayBySpecifiedType);

    expect(filteredArrayBySpecifiedType.All(item => <SomeClass>item !== undefined)).toBe(true, "Expected only items of type SomeOtherClass in the filtered array after running OfType of SomeOtherClass on it.");
  });

  it('can take while using TakeWhile upon predicate the expected sequence', () => {
    let someArray = [2, 4, 8, 12, 18, 13, 11];
    expect(someArray.TakeWhile<any>(x => x % 2 == 0)).toEqual([2, 4, 8, 12, 18]);
  });

  it('can skip while using SkipWhile upon predicate the expected sequence', () => {
    let someArray = [2, 4, 8, 12, 18, 13, 11];
    expect(someArray.SkipWhile<any>(x => x % 2 == 0)).toEqual([13, 11]);
  });

  it('can intersect two arrays and return expected', () => {
    let someArray = [1, 2, 3, 4, 5, 6, 7];
    let otherArray = [5, 6, 7, 9, 11];
    let intersection = someArray.Intersect(otherArray);
    expect(intersection).toEqual([5, 6, 7]);
  });

  it('can intersect two arrays and project out property and return expected', () => {
    let someArray = [{ Country: 'Norway', Capital: 'Oslo' }, { Country: 'Denmark', Capital: 'Copenhagen' }, { Country: 'Burkina Faso', Capital: 'Ougadougou' }, { Country: 'Finland', Capital: 'Helsinki' }];
    let otherArray = [{ Country: 'France', Capital: 'Paris' }, { Country: 'Germany', Capital: 'Berlin' }, { Country: 'Burkina Faso', Capital: 'Ougadougou' }, { Country: 'Finland', Capital: 'Helsinki' }];

    let intersection = someArray.IntersectSelect("Country", otherArray);
    expect(intersection).toEqual([{ Country: 'Burkina Faso', Capital: 'Ougadougou' }, { Country: 'Finland', Capital: 'Helsinki' }]);
  });

  it('can find maximum of arrays using Max,', () => {
    let inputArray = [1, 2, 3, 4, 5, 6, 7, 15, 4];
    expect(inputArray.Max()).toBe(15);
    let inputArrayOfChars = ['a', 'b', 'c', 'd', 'A', 'B', 'C'];
    expect(inputArrayOfChars.Max()).toBe('d');
  });

  it('can find maximum of arrays using MaxSelect,', () => {
    expect(StarWarsMovies.MaxSelect<Movie>("episode_number")).toBe("6");
  });

  it('can find minimum of arrays using MinSelect,', () => {
    expect(StarWarsMovies.MinSelect<Movie>("episode_number")).toBe("1");
  });

  it('can find maximum of arrays using Min,', () => {
    let inputArray = [1, 2, 3, 4, 5, 6, 7, 15, 4];
    expect(inputArray.Min()).toBe(1);
    let inputArrayOfChars = ['a', 'b', 'c', 'd', 'A', 'B', 'C'];
    expect(inputArrayOfChars.Min()).toBe('A');
  });


  it('can sort using OrderBy', () => {
    let inputArray: SomeClass[] = [
      { Num: 1, Name: "Foo" },
      { Num: -3, Name: "Baze" },
      { Num: 11, Name: "BelongToUs" },
      { Num: 5, Name: "AllyoBaze" }
    ];
    let sortedArray = inputArray.OrderBy<SomeClass>(s => s.Num);

    let sortedArrayNums = sortedArray.Select<SomeClass>("Num").map(s => s.Num);
    expect(sortedArrayNums).toEqual([-3, 1, 5, 11], "Expected that the sorting was performed on the input array.");
  });

  it('can sort using OrderByDescending', () => {
    let inputArray: SomeClass[] = [
      { Num: 1, Name: "Foo" },
      { Num: -3, Name: "Baze" },
      { Num: 11, Name: "BelongToUs" },
      { Num: 5, Name: "AllyoBaze" }
    ];
    let sortedArray = inputArray.OrderByDescending<SomeClass>(s => s.Num);
    let sortedArrayNums = sortedArray.Select<SomeClass>("Num").map(s => s.Num);
    expect(sortedArrayNums).toEqual([11, 5, 1, -3], "Expected that the sorting was performed on the input array.");
  });

  it('can sort using OrderBy and ThenBy', () => {
    let inputArray: SomeClass[] = [
      { Num: 1, Name: "Foo" },
      { Num: -3, Name: "Baze" },
      { Num: 11, Name: "BelongToUs" },
      { Num: 5, Name: "AllyoBaze" }
    ];

    let sortedArray = inputArray.OrderBy<SomeClass>(s => s.Num).ThenBy<SomeClass>(s => s.Name);
    console.log(sortedArray);
    let sortedArrayNames = sortedArray.Select<SomeClass>("Name").map(s => s.Name);
    console.log(sortedArrayNames);
    expect(sortedArrayNames).toEqual(["AllyoBaze", "Baze", "BelongToUs", "Foo"], "Expected that the sorting was performed using OrderBy and ThenBy on the input array.");
  });


});
