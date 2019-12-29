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
  lastMovieWithBoba: Movie;
  allMoviesWithLeia: Movie[];
  starwarsMovies: string;
  allTitlesAndEpisodeNumbers: any[];
  groupedByMoviesWithLando: any[];

  someGeneratedNumbers: number[];

  constructor() {
    this.starwarsMovies = JSON.stringify(StarWarsMovies);
    this.firstMovieWithBoba = StarWarsMovies.FirstOrDefault<Movie>(m => m.main_characters.indexOf('Boba Fett') >= 0);
    this.allMoviesWithLeia = StarWarsMovies.Where<Movie>(m => m.main_characters.indexOf('Princess Leia Organa') >= 0);

    this.lastMovieWithBoba = StarWarsMovies.LastOrDefault<Movie>(m => m.main_characters.indexOf('Boba Fett') >= 0);

    console.log(this.firstMovieWithBoba);
    console.log(this.allMoviesWithLeia);
    this.allTitlesAndEpisodeNumbers = StarWarsMovies.Select<Movie>("title", "episode_number");
    this.groupedByMoviesWithLando = StarWarsMovies.GroupBy<Movie>(movie =>
      movie.main_characters.indexOf('Jar Jar Binks') >= 0 ? "Movie starring JarJar" : "Movie not starring JarJar");

    console.log(this.allTitlesAndEpisodeNumbers);
    console.log(this.groupedByMoviesWithLando);

    console.log('Generating some numbers in an enumerable range');
    for (let num in [].EnumerableRange(1, 10)) {
      console.log(num);
    }
    this.someGeneratedNumbers = [].EnumerableRange(1, 10);
  }

}
