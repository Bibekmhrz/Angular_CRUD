import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServices } from '../app.services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  title = 'secondproject';
  id: string = '';
  mydata: any = [];
  currentIndex = -1;
  countries = ["Nepal", "India", "USA", "Canada", "Spain"];
  myform1: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl('')
  });
  submitted: boolean = false;

  constructor(
    private formServices: AppServices,
    private _router: Router,
    private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.myform1 = this.formBuilder.group(
      {
        name: ['',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        email: ['',
          [
            Validators.required,
            Validators.email
          ]
        ],
        country: ['']
      }
    );
    this.getAllData();

    this._Activatedroute.paramMap.subscribe(() => {
      this.id = this._Activatedroute.snapshot.queryParams['id'];
      if (this.id) {
        this.getById(this.id);
      }
    });
    


  }

  /**Validating FormControls */
  ValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.ValidateAllFormFields(control);
      }
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.myform1.controls;
  }

  submit() {

    console.log(this.myform1.value);
    this.submitted = true;
    if (this.myform1.valid) {
      this.formServices.createForm(JSON.stringify(this.myform1.value)).subscribe((data) => {
      });
      this._router.navigateByUrl('appList');
    }
    else {
      return;
    }
    

    this.myform1.reset();
  }

  getAllData() {
    this.formServices.getFormList().subscribe((data) => this.mydata = data);
  }

  getById(id: string) {
    this.formServices.getById(id).subscribe((data) => {
      this.myform1.patchValue(data);
      this.id = data._id;
    })
  }


  update() {
    console.log("Edited Data");
    this.formServices.updateForm(this.id, JSON.stringify(this.myform1.value)).subscribe((data) => {
      console.log("Edited successfully");
      this._router.navigateByUrl('appList');
    });
    this.myform1.reset();
    this.getAllData();
  }

  

}
