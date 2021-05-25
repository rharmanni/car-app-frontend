import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import {Trim} from "../trim";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrimService extends CrudService<Trim> {
  constructor(protected http: HttpClient) {
    super(http, '//localhost:8080/trims');
  }
}
