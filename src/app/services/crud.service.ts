import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export class CrudService<T> {

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    protected http: HttpClient,
    protected apiUrl: string
  ) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getOne(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T>(url);
  }

  addOne(t: T | any) {
    return this.http.post<T>(this.apiUrl, t);
  }

  updateOne(t: T | any, id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<T>(url, t);
  }

  deleteOne(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<T>(url);
  }

  search(t: T | any): Observable<T[]> { // TODO: Aanpassen
    const url = `${this.apiUrl}-search`;
    return this.http.post<T[]>(url, t, this.httpOptions);
  }

}
