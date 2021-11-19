import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Tournament } from './model/tournament';
import { Match } from './model/match';
import { TournamentCreate } from './model/tournament_create';


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

  getMatchesByTournamentId(id1: string): Observable<[]> {
    // const url = `${this.boltUrl}tournament/${id1}`;
    const url = this.boltUrl + 'match/tournament/' + id1;
    return this.http.get<[]>(url, this.requestOptions).pipe(
      tap(_ => console.log('fetched matches')),
      catchError(this.handleError<[]>('getMatchesByTournamentId', []))
    );
  }

  displayMatchesByTournament(id1: string): Observable<Match[]> {
    // const url = `${this.boltUrl}tournament/${id1}`;
    const url = this.boltUrl+'match/tournament/'+id1;
    return this.http.get<Match[]>(url)
    .pipe(
        tap(_ => console.log(`fetched Match-Tournament id=${id1}`)),
        catchError(this.handleError<Match[]>(`getMatch-Tournament id=${id1}`))
    );
  }
  
 
  //   /** POST: add a new Tournament to the server */
  addTournament(tournament: TournamentCreate) {
    console.log('Add Tournament ...')
    const url = this.boltUrl + 'tournament/create';

    this.http.post(url, tournament).subscribe(responseDate => {
      console.log(responseDate)
    })
  }

  deleteTournament(id1: string) {
    console.log('Deleting Tournament ...')
    const url = this.boltUrl + 'tournament/delete/'+id1;

    this.http.get(url).subscribe(responseDate => {
      console.log(responseDate)
    })
  }

  // POST: Update existing Tournament
  updtTournament(tournament: Tournament) {
    console.log(`Updating Tournament: ${ tournament._id }`)
    const url = this.boltUrl + 'tournament/update/'+tournament._id;

    this.http.post(url, tournament).pipe(tap(_ => console.log(`updated Tournament id = ${ tournament._id }`)),
    catchError(this.handleError<any>('updateTournament'))).subscribe(responseDate => {
      console.log(responseDate)
    })
  }

  // Error Handling mechanism, TBI
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }
}