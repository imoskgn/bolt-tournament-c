import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Tournament } from './model/tournament';
import { Match } from './model/match';
import { TournamentCreate } from './model/tournament_create';
import { PostCreate } from './model/post_create';
import { Post } from './model/post';
import { MatchWinner } from './model/match_winner';
import { User } from './model/user';


@Injectable({ providedIn: 'root' })
export class DbService {
  private boltUrl = 'https://bolt-tournament-s.herokuapp.com/';  // URL to web api

  headerDict = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) { }


  //****************** Tournaments ****************************

  addTournament(tournament: TournamentCreate) {
    console.log('Add Tournament ...')
    const url = this.boltUrl + 'tournament/create';

    this.http.post(url, tournament).subscribe(responseDate => {
      console.log(responseDate)
    })
  }
  /** GET Tournaments from the server */
  getTournaments(): Observable<Tournament[]> {
    const url = this.boltUrl + 'tournament/';
    return this.http.get<Tournament[]>(url, this.requestOptions)
      .pipe(
        tap(_ => console.log('fetched tournaments')),
        catchError(this.handleError<Tournament[]>('getTournaments', []))
      );
  }

  /** GET Tournament by id. Will 404 if id not found */
  getTournamentById(id1: string): Observable<Tournament> {
    // const url = `${this.boltUrl}tournament/${id1}`;
    const url = this.boltUrl + 'tournament/' + id1;
    return this.http.get<Tournament>(url)
      .pipe(
        tap(_ => console.log(`fetched Tournament id=${id1}`)),
        catchError(this.handleError<Tournament>(`getTournament id=${id1}`))
      );
  }



  deleteTournament(id1: string): Observable<any> {
    console.log('Deleting Tournament ...')
    const url = this.boltUrl + 'tournament/delete/' + id1;

    return this.http.delete(url);
  }

  // POST: Update existing Tournament
  updtTournament(tournament: Tournament) {
    console.log(`Updating Tournament: ${tournament._id}`)
    const url = this.boltUrl + 'tournament/update/' + tournament._id;

    this.http.post(url, tournament).pipe(tap(_ => console.log(`updated Tournament id = ${tournament._id}`)),
      catchError(this.handleError<any>('updateTournament'))).subscribe(responseDate => {
        console.log(responseDate)
      })
  }


  //****************** Matches ****************************
  createMatch(tournament: Tournament): Observable<any> {
    console.log('Add Match ...')
    const url = this.boltUrl + 'match/create/first/' + tournament._id;

    return this.http.post(url, tournament);
  }

  getMatchesByTournamentId(id1: string): Observable<[]> {
    // const url = `${this.boltUrl}tournament/${id1}`;
    const url = this.boltUrl + 'match/tournament/' + id1;
    return this.http.get<[]>(url, this.requestOptions).pipe(
      tap(_ => console.log('fetched matches')),
      catchError(this.handleError<[]>('getMatchesByTournamentId', []))
    );
  }

  updateWinner(match: MatchWinner, id: string): Observable<any> {
    console.log(`Updating Match: ${id}`)
    const url = this.boltUrl + 'match/update/' + id;

    return this.http.post(url, match).pipe(tap(_ => console.log(`updated match id = ${id}`)),
      catchError(this.handleError<any>('updateMatch')));

  }
  // POST: Update Match from Tournament
  updateMatch(match: MatchWinner, id: string | undefined): Observable<any> {
    console.log(`Updating Match Tournament: ${id}`)
    const url = this.boltUrl + 'match/update-match/' + id;

    return this.http.post(url, match).pipe(tap(_ => console.log(`updated match Tournament id = ${id}`)),
      catchError(this.handleError<any>('updateMatchTournament')));
  }

  //****************** Forum ****************************
  getPosts(): Observable<Post[]> {
    const url = this.boltUrl + 'forum/post/';
    return this.http.get<Post[]>(url, this.requestOptions)
      .pipe(
        tap(_ => console.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }




  getPostById(id1: string): Observable<Post> {
    // const url = `${this.boltUrl}forum/post/${id1}`;
    const url = this.boltUrl + 'forum/post/' + id1;
    return this.http.get<Post>(url)
      .pipe(
        tap(_ => console.log(`fetched Post id=${id1}`)),
        catchError(this.handleError<Post>(`getPostById id=${id1}`))
      );
  }



  createPost(post: PostCreate): Observable<any> {
    console.log('Add Post ...')
    const url = this.boltUrl + 'forum/post/create';

    return this.http.post(url, post);
  }


  /*   getLoggedInUser(auth_token): Observable<any> {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.get(url, { headers: headers })
    } */


  // Error Handling mechanism, TBI
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }
}