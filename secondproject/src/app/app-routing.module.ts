import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplistComponent } from './applist/applist.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path : '',
    component : FormComponent
  },
  {
    path : 'appList',
    component : ApplistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
