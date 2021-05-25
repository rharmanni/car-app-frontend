import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Brand} from "../brand";
import {ActivatedRoute} from "@angular/router";
import {BrandService} from "../services/brand.service";
import {ModelService} from "../services/model.service";
import {ImageService} from "../services/image.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Model} from "../model";
import {COUNTRIES} from "../countries";

declare let $: any;

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  countries = COUNTRIES;

  brand: Brand;
  models: Model[];
  modelForm;
  searchForm;
  isUpdate = false;
  @ViewChild('image') image: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private modelService: ModelService,
    private imageService: ImageService,
    private formBuilder: FormBuilder
  ) {
    this.modelForm = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      generation: [null, [Validators.pattern("^[0-9]*$"), Validators.max(1000)]],
      yearIntroduction: [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      yearDiscontinued: [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      image: '',
      imageUrl: ''
    })
    this.searchForm = this.formBuilder.group({
      id: null,
      name: ['', [Validators.maxLength(100)]]
      // generation: [null, [Validators.pattern("^[0-9]*$"), Validators.max(1000)]],
      // yearIntroductionFrom: [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      // yearIntroductionTo: [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      // yearDiscontinued: [null, [Validators.pattern("^[0-9]*$"), Validators.min(1800), Validators.max(2100)]],
      // image: '',
      // imageUrl: ''
    })
  }

  ngOnInit(): void {
    this.getBrand();
    this.isUpdate = false;
    this.modelForm.patchValue({id: null});
  }

  getBrand(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.brandService.getOne(id).subscribe(brand => this.brand = brand);
  }

  submitForm(modelData, isUpdate) {
    const formData = new FormData();
    formData.append("file", this.imageService.getImage(this.image));
    formData.append("model", new Blob([JSON.stringify({
      name: modelData.name,
      generation: modelData.generation,
      yearIntroduction: modelData.yearIntroduction,
      yearDiscontinued: modelData.yearDiscontinued,
      brand: this.brand
    })], {type: "application/json"}));
    if (!isUpdate) {
      console.log("Adding");
      this.modelService.addOne(formData).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
        })
      )
    } else {
      console.log("Updating");
      this.modelService.updateOne(formData, modelData.id).subscribe(
        res => $("#exampleModal").modal('hide'),
        err => this.handleError(err),
        () => $('#exampleModal').on('hidden.bs.modal', () => {
          this.ngOnInit();
        })
      )
    }
  }

  submitSearch(searchData) {
    searchData.brandId = this.brand.id;
    this.modelService.search(JSON.stringify(searchData)).subscribe(
      res => this.models = res,
      err => this.handleError(err),
      () => {
        this.brand.models = this.models;
      });
  }

  handleError(err): void {
    this.modelForm.setErrors(null);
    // Displays only one message per property for clarity.
    if (err['error'] instanceof Array) {
      for (let error of err['error']) {
        console.log(error);
        this.modelForm
          .get(error.property)
          .setErrors({message: error.message});
      }
    } else {
      this.modelForm
        .get(err['error'].property)
        .setErrors({message: err['error'].message});
    }
  }


  edit($event: MouseEvent, model: Model) {
    $("#exampleModal").modal();
    this.isUpdate = true;
    $event.stopPropagation();
    this.modelForm.patchValue({
      id: model.id,
      name: model.name,
      yearIntroduction: model.yearIntroduction,
      yearDiscontinued: model.yearDiscontinued,
      brand: model.brand,
      image: null
    })
  }

  remove($event: MouseEvent, model: Model) {
    var target = $event.currentTarget as Element;
    $event.stopPropagation();
    if (window.confirm('Are sure you want to delete this model?')) {
      this.modelService.deleteOne(model.id).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => this.ngOnInit()
      )
    }
  }

  cancelEdit($event: MouseEvent) {
    $event.stopPropagation();
    this.modelForm.reset();
    this.ngOnInit();
  }

  addInit($event: MouseEvent): void {
    this.isUpdate = false;
  }

  updateInit($event: MouseEvent): void {
    this.isUpdate = true;
  }

}
