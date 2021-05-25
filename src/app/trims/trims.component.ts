import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModelService} from "../services/model.service";
import {ImageService} from "../services/image.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Model} from "../model";
import {TrimService} from "../services/trim.service";
import {Trim} from "../trim";
import {Sort} from '@angular/material/sort';

declare let $: any;

@Component({
  selector: 'app-trims',
  templateUrl: './trims.component.html',
  styleUrls: ['./trims.component.css']
})
export class TrimsComponent implements OnInit {
  model: Model;
  trims: Trim[];
  trimForm;
  searchForm;
  isUpdate = false;
  @ViewChild('image') image: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private trimService: TrimService,
    private modelService: ModelService,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {
    this.trimForm = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      engine: ['', [Validators.maxLength(100)]],
      transmission: ['', [Validators.maxLength(100)]],
      bodyStyle: ['', [Validators.maxLength(100)]],
      yearBuilt: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      image: '',
      imageUrl: '',
    })
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]],
      engine: ['', [Validators.maxLength(100)]],
      transmission: ['', [Validators.maxLength(100)]],
      bodyStyle: ['', [Validators.maxLength(100)]],
      yearBuilt: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
    })
  }

  ngOnInit(): void {
    this.getModel();
    this.isUpdate = false;
    this.trimForm.patchValue({id: null});
  }

  getModel(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.modelService.getOne(id).subscribe(
      model => this.model = model,
      err => console.log(err),
      () => {
        console.log(this.model);
      });
    console.log(this.model);
  }

  submitForm(trimData, isUpdate) {
    const formData = new FormData();
    formData.append("file", this.imageService.getImage(this.image));
    formData.append("trim", new Blob([JSON.stringify({
      id: trimData.id,
      name: trimData.name,
      engine: trimData.engine,
      transmission: trimData.transmission,
      bodyStyle: trimData.bodyStyle,
      yearBuilt: trimData.yearBuilt,
      model: this.model,
    })], {type: "application/json"}));
    if (!isUpdate) {
      console.log("Adding");
      this.trimService.addOne(formData).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
        })
      )
    } else {
      console.log("Updating");
      this.trimService.updateOne(formData, trimData.id).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
        })
      )
    }
  }

  handleError(err): void {
    console.log(err);
    // Displays only one message per property for clarity.
    if (err['error'] instanceof Array) {
      for (let error of err['error']) {
        this.trimForm
          .get(error.property)
          .setErrors({message: error.message});
      }
    } else {
      this.trimForm
        .get(err['error'].property)
        .setErrors({message: err['error'].message});
    }
  }

  edit($event: MouseEvent, trim: Trim) {
    $("#exampleModal").modal();
    this.isUpdate = true;
    $event.stopPropagation();
    this.trimForm.patchValue({
      id: trim.id,
      name: trim.name,
      engine: trim.engine,
      transmission: trim.transmission,
      bodyStyle: trim.bodyStyle,
      yearBuilt: trim.yearBuilt,
      model: trim.model,
      image: null
    })
  }

  // https://material.angular.io/components/sort/overview
  sortData(sort: Sort) {
    const data = this.model.trims.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.model.trims = data.sort((a, b) => {
    //     const isAsc = sort.direction === 'asc';
    //     return this.compare(a.id, b.id, isAsc);
    //   })
    // }
    this.model.trims = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'yearBuilt': return this.compare(a.yearBuilt, b.yearBuilt, isAsc);
        default: return 0;
      }
    });
  }

  // https://material.angular.io/components/sort/overview
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  submitSearch(searchData) {
    searchData.modelId = this.model.id;
    searchData.brandId = this.model.brand.id;
    this.trimService.search(JSON.stringify(searchData)).subscribe(
      res => this.trims = res,
      err => this.handleError(err),
      () => {
        this.model.trims = this.trims;
      });
  }

  remove($event: MouseEvent, trim: Trim) {
    $event.stopPropagation();
    if (window.confirm('Are sure you want to delete this trim?')) {
      this.trimService.deleteOne(trim.id).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => this.ngOnInit()
      )
    }
  }

  addInit($event: MouseEvent): void {
    this.isUpdate = false;
    this.trimForm.reset();
  }

  updateInit($event: MouseEvent): void {
    this.isUpdate = true;
  }

  sort(sort: Sort) {

  }


}
