import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Model} from "../model";
import {CrudService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class ModelService extends CrudService<Model>{
  constructor(protected http: HttpClient) {
    super(http, '//localhost:8080/models');
  }
}
