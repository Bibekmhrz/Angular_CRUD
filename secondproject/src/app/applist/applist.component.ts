import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from '../app.services';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.scss']
})
export class ApplistComponent {
  mydata: any = [];
  constructor(
    private formServices: AppServices,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.formServices.getFormList().subscribe((data) => this.mydata = data);
  }
  delete(id: string) {
    console.log("Data after Deleted");

    this.formServices.deleteForm(id).subscribe((data) => {
      console.log("Deleted successfully");
      this.getAllData();
    });


  }

}
