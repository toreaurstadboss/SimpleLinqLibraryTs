# SimpleTsLinq

Welcome to SimpleTsLinq! This is a simple to use library that bridges the gap towards Typescript and Array handling methods for developers such as those with a C# and Linq background!

* It is a simple library
* It does not sport advanced Linq kind of functionality such as delayed execution. (One method though uses generator functions which can be delayed - EnumerableRange).
* It quacks like Linq and walks like Linq, but it still is not a true Linq clone. For that, consider more advanced libraries such as TsLinq.
* It is easy to extend and can be forked easily from Github (use the link) to adjust your needs.
* It can easily be tested using 'ng test' (Karma / Jasmine specs).

To get started, import the following:

```typescript
import { StarWarsMovies } from "simpletslinq/dist/StarwarsMovies";
import { Movie } from "simpletslinq/dist/Movie";
import "simpletslinq";
```
The first two lines are just some sample data.

The following code shows example usage - note that these are only some of the methods available! :

```typescript

export class AppComponent {
  title = "SimpleTsLinq Consumption demo";

  firstMovieWithBoba: Movie;
  lastMovieWithBoba: Movie;
  allMoviesWithLeia: Movie[];
  starwarsMovies: string;
  allTitlesAndEpisodeNumbers: any[];
  groupedMoviesWithJarJarBinks: any[];

  movieStarringJarJarBinks: boolean;

  movieStarringSomeOneSkyWalker: boolean;

  someGeneratedNumbers: number[];

  constructor() {
    this.starwarsMovies = JSON.stringify(StarWarsMovies);
    this.firstMovieWithBoba = StarWarsMovies.FirstOrDefault<Movie>(
      m => m.main_characters.indexOf("Boba Fett") >= 0
    );
    this.allMoviesWithLeia = StarWarsMovies.Where<Movie>(
      m => m.main_characters.indexOf("Princess Leia Organa") >= 0
    );

    this.lastMovieWithBoba = StarWarsMovies.LastOrDefault<Movie>(
      m => m.main_characters.indexOf("Boba Fett") >= 0
    );

    console.log(this.firstMovieWithBoba);
    console.log(this.allMoviesWithLeia);
    this.allTitlesAndEpisodeNumbers = StarWarsMovies.Select<Movie>(
      "title",
      "episode_number"
    );
    this.groupedMoviesWithJarJarBinks = StarWarsMovies.GroupBy<Movie>(movie =>
      movie.main_characters.indexOf("Jar Jar Binks") >= 0
        ? "Movie starring JarJar"
        : "Movie not starring JarJar"
    );

    console.log(this.allTitlesAndEpisodeNumbers);
    console.log(this.groupedMoviesWithJarJarBinks);

    console.log("Generating some numbers in an enumerable range");
    for (let num in [].EnumerableRange(1, 10)) {
      console.log(num);
    }
    this.someGeneratedNumbers = [].EnumerableRange(1, 10);

    this.movieStarringJarJarBinks = StarWarsMovies.Any<Movie>(
      m => m.main_characters.indexOf("Jar Jar Binks") >= 0
    );
    this.movieStarringSomeOneSkyWalker = StarWarsMovies.All<Movie>(m =>
      m.main_characters.Any<string>(ch => ch.search(/SkyWalker/i) >= 0)
    );
  }

```



Methods available in SimpleTsLinq:

```typescript

  type predicate<T> = (arg: T) => boolean;
  type sortingValue<T> = (arg: T) => any;
  type keySelector<T> = (arg: T) => any;
  type resultSelector<T, TInner> = (arg: T, arg2: TInner) => any;

  interface IArray<T> consists of multiple Array.prototype implementations.

    FirstOrDefault<T>(condition: predicate<T>): T;
    SingleOrDefault<T>(condition: predicate<T>): T;
    First<T>(condition: predicate<T>): T;
    Single<T>(condition: predicate<T>): T;
    LastOrDefault<T>(condition: predicate<T>): T;
    AddRange<T>(itemsToAdd: T[]);
    InsertRange<T>(index: number, itemsToAdd: T[]);
    RemoveAt(index: number): T;
    RemoveWhere<T>(condition: predicate<T>): T[];  
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

```



Note - this is not 'Linq'! It is similar to Linq in syntax and functionality, but not a full fledged LinqProvider for Typescript. It does also not star delayed execution, this is possible in other libraries (such as TsLinq). It could though be used for many scenarios, still. The goal is to help out developers coming from a  C# and Linq background to do array operations in Typescript with same kind of syntax as Linq. This library is very easy to understand and extend. You can fork the repo from Github linked also here (see Homepage and repository links on npmjs portal to the right).

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.
It is however built from a lib folder within. There are no dependencies other than the library itself,
plus two libs for ES5 compability. (There are multiple dev dependencies to the Angular compiler and Angular libs, if you want to fork this library).

To test out the library run one of these two commands:
```bash
npm run test
ng test
```

You can install ng Angular CLI using :

```bash
npm install -g @angular/cli
```

The library contains assorted methods that covers a lot of functionality that Linq offers for developers coming from a background of C# and Linq. 

The library contains additional helper methods to work with arrays. Most methods are Array prototype methods or 'extension methods' to make the similarity with Linq even more clear.

To use these Linq helper methods, just apply them directly on array instances or just type '[].' to list them up.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Forking this library to your own.

Modify files:
* array-extensions.ts
* array-extensions.spec.ts

Copy these two into the lib folder in the files:
* index.ts
* index.spec.ts

Modify package.json in lib folder. Change name of library and bump version. Now just publish to Npm.

```bash
npm login
#your credentials please.
npm publish
```

