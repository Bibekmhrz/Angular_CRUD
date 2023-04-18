import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplistComponent } from '../applist/applist.component';

const routes: Routes = [
    {
      path : '',
      component : AppComponent
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
