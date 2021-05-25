import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Brand} from "../brand";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BrandService} from "../services/brand.service";
import {ImageService} from "../services/image.service";
import {COUNTRIES} from '../countries';
import {HttpHeaders} from "@angular/common/http";

declare let $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  countries = COUNTRIES;

  brands: Brand[];
  searchForm;
  brandForm;
  isUpdate = false;
  @ViewChild('image') image: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {
    let nameValidation = ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]];
    let countryValidation = ['', [Validators.maxLength(100)]];
    let dateValidation = [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]];
    let fromValidation = [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800)]];
    let toValidation = [null, [Validators.pattern("^[0-9]*$"), Validators.max(2100)]];
    this.brandForm = this.formBuilder.group({
      id: null,
      name: nameValidation,
      country: countryValidation,
      dateFounded: dateValidation,
      image: '',
      imageUrl: ''
    })
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]],
      country: countryValidation,
      from: fromValidation,
      to: toValidation
    })
  }

  ngOnInit(): void {
    this.getBrands();
    this.isUpdate = false;
    this.brandForm.patchValue({id: null});
  }

  getBrands(): void {
    this.brandService.getAll().subscribe(brand => this.brands = brand);
  }

  submitForm(brandData, isUpdate) {
    const formData = new FormData();
    formData.append("file", this.imageService.getImage(this.image));
    formData.append("brand", new Blob([JSON.stringify({
      id: brandData.id,
      name: brandData.name,
      country: brandData.country,
      dateFounded: brandData.dateFounded,
      imageUrl: brandData.imageUrl
    })], {type: "application/json"}));
    if (!isUpdate) {
      console.log("Adding");
      this.brandService.addOne(formData).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
          this.brandForm.reset();
        })
      )
    } else {
      console.log("Updating");
      this.brandService.updateOne(formData, brandData.id).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
        })
      )
    }
  }

  submitSearch(searchData) {
    this.brandService.search(JSON.stringify(searchData)).subscribe(brand => this.brands = brand)
  }

  edit($event: MouseEvent, brand: Brand) {
    var target = $event.currentTarget as Element;
    $("#exampleModal").modal();
    console.log(target);
    this.isUpdate = true;
    $event.stopPropagation();
    this.brandForm.patchValue({
      id: brand.id,
      name: brand.name,
      country: brand.country,
      dateFounded: brand.dateFounded,
      imageUrl: brand.imageUrl,
      image: null
    })
  }

  remove($event: MouseEvent, brand: Brand) {
    $event.stopPropagation();
    if (window.confirm('Are sure you want to delete this brand?')) {
      this.brandService.deleteOne(brand.id).subscribe(
        res => console.log(res),
        err => this.handleError(err),
        () => this.ngOnInit()
      )
    }
  }

  handleError(err): void {
    // Displays only one message per property for clarity.
    console.log(err);
    if (err['error'] instanceof Array) {
      for (let error of err['error']) {
        this.brandForm
          .get(error.property)
          .setErrors({message: error.message});
      }
    } else {
      this.brandForm
        .get(err['error'].property)
        .setErrors({message: err['error'].message});
    }
  }

  cancelEdit($event: MouseEvent) {
    $event.stopPropagation();
    this.brandForm.reset();
    this.ngOnInit();
  }


  addInit($event: MouseEvent): void {
    this.isUpdate = false;
  }

  updateInit($event: MouseEvent): void {
    this.isUpdate = true;
  }

}
