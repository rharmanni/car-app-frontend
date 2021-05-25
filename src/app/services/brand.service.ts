import { Injectable } from '@angular/core';
import {CrudService} from "./crud.service";
import {Brand} from "../brand";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends CrudService<Brand>{
  constructor(protected http: HttpClient) {
    super(http, '//localhost:8080/brands');
  }
}
