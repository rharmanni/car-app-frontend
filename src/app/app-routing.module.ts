import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModelsComponent} from "./models/models.component";
import {TrimsComponent} from "./trims/trims.component";
import {TrimComponent} from "./trim/trim.component";
import {BrandsComponent} from "./brands/brands.component";


const routes: Routes = [
  {path: '', redirectTo: '/brands', pathMatch: 'full'},
  {path: 'brands', component: BrandsComponent},
  {path: 'brand/:id', component: ModelsComponent},
  {path: 'model/:id', component: TrimsComponent},
  {path: 'trim/:id', component: TrimComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
