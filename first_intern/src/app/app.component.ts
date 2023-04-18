import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServices } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'first_intern';
  id:string='';
  mydata:any = [];
  currentIndex = -1;
  countries =["Nepal","India","USA","Canada","Spain"];
  myform1:FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl()
  });

  constructor(
    private formServices: AppServices,
    private _router: Router,
    )
  {}

  ngOnInit(): void {
    this.getAllData();
  }

  submit()
  {

    console.log("Inside submit");
    console.log(this.myform1.value);
    if(this.myform1.valid)
    {
      this.formServices.createForm(JSON.stringify(this.myform1.value)).subscribe((data) => {
        console.log(data);
        this._router.navigateByUrl('appList');
      });
    }
    // if(this.currentIndex == -1)
    //   this.mydata.push(this.myform1.value);
    // else
    //   {
    //     this.mydata[this.currentIndex] = this.myform1.value;
    //     this.currentIndex = -1;
    //   }

    console.log(this.mydata);
    this.myform1.reset();
  }

  getAllData()
  {
    this.formServices.getFormList().subscribe((data) => this.mydata = data);
  }

  getById(id:string)
  {
    this.formServices.getById(id).subscribe((data) => {
      this.myform1.patchValue(data);
      this.id=data._id;
    })
  }


  edit()
  {
    console.log("Edited Data");
    // console.log(obj);
    // this.myform1.patchValue(obj);
    // console.log(i);
    // this.currentIndex = i;
    this.formServices.updateForm(this.id, JSON.stringify(this.myform1.value)).subscribe((data) => console.log("Edited successfully"));
    this.myform1.reset();
    this.getAllData();
  }

  delete(id:string)
  {
    console.log("Data after Deleted");
    //console.log(obj);
    // this.mydata.splice(i,1);
    // console.log(i);
    // this.currentIndex = i;
    this.formServices.deleteForm(id).subscribe((data) => console.log("Deleted successfully"));
    this.getAllData();

  }

}
