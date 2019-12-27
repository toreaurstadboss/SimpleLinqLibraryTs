# TsExtensions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

To use these Linq helper methods just do the same as in the app.component.ts file

Note that the component imports './array-extensions' 
This will import the necessary Array prototype methods for Where and FirstOrDefault or other similar methods. 

These two supports predicate methods passed into them. 


```typescript

import { Component, Inject } from '@angular/core';
import { StarWarsMovies } from './starwarsmovies';
import { Movie } from './movie';
import './array-extensions';



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
