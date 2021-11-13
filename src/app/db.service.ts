import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Tournament } from './model/tournament';


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

  /** GET Tournament by id. Return 'undefined' when id not found */
  //   getTournamentNo404<Data>(id: number): Observable<Tournament> {
  //     const url = `${this.boltUrl}/?id=${id}`;
  //     return this.http.get<Tournament[]>(url)
  //       .pipe(
  //         map(Tournamentes => Tournamentes[0]), // returns a {0|1} element array
  //         tap(h => {
  //           const outcome = h ? 'fetched' : 'did not find';
  //           console.log('${outcome} Tournament id=${id}');
  //         }),
  //         catchError(this.handleError<Tournament>('getTournament id=${id}'))
  //       );
  //   }

  /** GET Tournament by id. Will 404 if id not found */
  getTournamentById(id1: string): Observable<Tournament> {
    // const url = `${this.boltUrl}tournament/${id1}`;
    const url = this.boltUrl+'tournament/'+id1;
    return this.http.get<Tournament>(url)
    .pipe(
        tap(_ => console.log(`fetched Tournament id=${id1}`)),
        catchError(this.handleError<Tournament>(`getTournament id=${id1}`))
    );
  }
  //Vara version

  //   /* GET Tournamentes whose name contains search term */
  //   searchTournamentes(term: string): Observable<Tournament[]> {
  //     if (!term.trim()) {
  //       // if not search term, return empty Tournament array.
  //       return of([]);
  //     }
  //     return this.http.get<Tournament[]>('${this.boltUrl}/?name=${term}').pipe(
  //       tap(x => x.length ?
  //          console.log('found Tournamentes matching "${term}"') :
  //          console.log('no Tournamentes matching "${term}"')),
  //       catchError(this.handleError<Tournament[]>('searchTournamentes', []))
  //     );
  //   }

  //   //////// Save methods //////////

  //   /** POST: add a new Tournament to the server */
  addTournament(tournament: Tournament) {
    console.log('Add Tournament ...')
    const url = this.boltUrl + 'tournament/create';

    this.http.post(url, tournament).subscribe(responseDate => {
      console.log(responseDate)
    })


    //convert it to jason 
    //var json = JSON.stringify(tournament);

    //console.log(json);

  }
  //   addTournament(Tournament: Tournament): Observable<Tournament> {
  //     return this.http.post<Tournament>(this.boltUrl, Tournament, this.httpOptions).pipe(
  //       tap((newTournament: Tournament) => console.log('added Tournament w/ id=${newTournament._id}')),
  //       catchError(this.handleError<Tournament>('addTournament'))
  //     );
  //   }

  //   /** DELETE: delete the Tournament from the server */
  //   deleteTournament(id: number): Observable<Tournament> {
  //     const url = '${this.boltUrl}/${id}';

  //     return this.http.delete<Tournament>(url, this.httpOptions).pipe(
  //       tap(_ => console.log('deleted Tournament id=${id}')),
  //       catchError(this.handleError<Tournament>('deleteTournament'))
  //     );
  //   }





  /** PUT: update the Tournament on the server */
  updateTournament(Tournament: Tournament): Observable<any> {
    return this.http.put(this.boltUrl+`/update/${Tournament._id}`, Tournament, this.requestOptions).pipe(
      tap(_ => console.log(`updated Tournament id=${Tournament._id}`)),
      catchError(this.handleError<any>('updateTournament'))
    );
  }

  //   /**
  //    * Handle Http operation that failed.
  //    * Let the app continue.
  //    * @param operation - name of the operation that failed
  //    * @param result - optional value to return as the observable result
  //    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming   error for user consumption
      console.log('${operation} failed: ${error.message}');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}