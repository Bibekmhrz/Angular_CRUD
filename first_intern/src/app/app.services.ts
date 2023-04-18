import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  private baseUrl = 'https://crudcrud.com/api/27c77dced3154ae6b227e24ff0618d3a/person';

  constructor(private http: HttpClient) { }

  getById(i: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${i}`);
  }


  createForm(form: Object): Observable<Object> {
    let headers = {
        'Content-Type': 'application/json'
    };
    return this.http.post(`${this.baseUrl}`, form, { headers });
  }

  updateForm(i: string, value: any): Observable<Object> {
    let headers = {
        'Content-Type': 'application/json'
    };
    return this.http.put(`${this.baseUrl}/${i}`, value, { headers });
  }

  deleteForm(i: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${i}`, { responseType: 'text' });
  }

  getFormList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}