import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  url = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  new_transaction(body: any) {
    return this.http.post(this.url + "new_transaction", body).pipe(
      catchError(this.handleError)
    );
  }

  pending_tx() {
    return this.http.get(this.url + "pending_tx").pipe(
      catchError(this.handleError)
    );
  }

  chain() {
    return this.http.get(this.url + "chain").pipe(
      catchError(this.handleError)
    );
  }

  mine() {
    return this.http.get(this.url + "mine").pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('User Error');
  };

}
