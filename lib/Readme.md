# TsLinq

Note - this is not 'Linq'! It is similar to Linq in syntax and functionality, but not a full fledged LinqProvider for Typescript. It could though be used for many scenarios. The goal is to help out developers coming from a  C# and Linq background to do array operations in Typescript with same kind of syntax as Linq.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

I have added Angular 8 also so it is possible to use Karma to test out the library. 

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

Example usage inside an Angular component.

```typescript

import { Component, Inject } from '@angular/core';
import { StarWarsMovies } from './starwarsmovies'; //example 
import { Movie } from './movie'; //example 
import './node_modules/tslinq/array-extensions'; //always import this file before beginning to use TsLinq



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Linq TsExtensions demo';

  firstMovieWithBoba: Movie;
  allMoviesWithLeia: Movie[];
  starwarsMovies: string;

  constructor() {
    //example methods of TsLinq below
    this.starwarsMovies = JSON.stringify(StarWarsMovies);
    this.firstMovieWithBoba = StarWarsMovies.FirstOrDefault<Movie>(m => m.main_characters.indexOf('Boba Fett') > 0);
    this.allMoviesWithLeia = StarWarsMovies.Where<Movie>(m => m.main_characters.indexOf('Princess Leia Organa') > 0);
    console.log(this.firstMovieWithBoba);
    console.log(this.allMoviesWithLeia);
  }



}


```



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
