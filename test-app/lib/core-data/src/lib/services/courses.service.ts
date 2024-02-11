import {Injectable} from '@angular/core';
import {Course} from "../data/Course";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../../../model/endpoints";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { }

  all() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token',
        'xAAAA': 'gtyhfr'
      }),
      params: new HttpParams().set('utm', 'REFERRAL_SOURCE')
    }
    return this.http.get<Course[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.COURSES), httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  find(id: string | null) {
    return this.http.get<Course>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.COURSES) + `${id ? '/' + id : ''}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  create(course: Course) {
    return this.http.post<Course>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.COURSES), course)
      .pipe(catchError(error => this.handleError(error)));
  }

  update(course: Course) {
    return this.http.put<Course>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.COURSES) + '/' + course.id, course)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(course: Course) {
    return this.http.get<Course>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.COURSES) + '/' + course.id)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      //
    } else {
      //
    }

    return throwError(() => 'Shit broke yo!')
  }
}
