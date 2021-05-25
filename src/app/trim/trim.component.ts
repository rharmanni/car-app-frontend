import {Component, OnInit} from '@angular/core';
import {Trim} from "../trim";
import {ActivatedRoute} from "@angular/router";
import {TrimService} from "../services/trim.service";

@Component({
  selector: 'app-trim',
  templateUrl: './trim.component.html',
  styleUrls: ['./trim.component.css']
})
export class TrimComponent implements OnInit {

  trim: Trim;

  constructor(
    private route: ActivatedRoute,
    private trimService: TrimService
  ) {
  }

  ngOnInit(): void {
    this.getTrim();
  }

  //
  getTrim(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trimService.getOne(id).subscribe(trim => this.trim = trim);
  }

}
