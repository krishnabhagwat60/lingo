import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'https://lingolista.auxesisdevelopment.com/api/'
  // baseUrl = 'https://backend.lingolista.com/api/'
  tempUrl = "https://www.universal-tutorial.com/api/"

  globaleData = []
  constructor(private http: HttpClient) {
  }

  saveData(data){
   this.globaleData = data;
  }
  getData(endPoint,token): Observable<any> {
    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      }),
    };
    return this.http.get(this.tempUrl + endPoint, httpOptions);
  }
  // post  method
  post(endPoint, data, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.post(this.baseUrl + endPoint, data, httpOptions);
    } else if (isHeader === 1) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('token'),
           'Authorization': sessionStorage.getItem('basic_key')
        }),
        withCredentials: true,
        observe: 'response' as 'response'
      }
       
        return this.http.post(this.baseUrl + endPoint,  data, httpOptions);
    }
   
  }
  post1(endPoint, data, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.post(this.baseUrl + endPoint, data, httpOptions);
    } else if (isHeader === 1) { //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('token'),
           'Authorization': 'Bearer ' + localStorage.getItem('paypalToken')
        }),
        withCredentials: true,
        observe: 'response' as 'response'
      }
       
        return this.http.post(this.baseUrl + endPoint,  data, httpOptions);
    }
  }
  getAuthToken(endPoint): Observable<any> {
    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'api-token': '9JGxGPezIYmnpGWJdScyI7Yembf01mN3J1Oh1NslbvkjtX4Vj6Q0eaBNRPfeoCypI-Q',
        'user-email': 'umangchopra833@gmail.com',
      }),
    };
    return this.http.get(this.tempUrl + endPoint, httpOptions);
  }
  // get method
  get(endPoint, isHeader): Observable<any> {
    let httpOptions;
    if (isHeader === 0) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.get(this.baseUrl + endPoint, httpOptions);
    } else if (isHeader === 1) {  //method with token
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('token'),
          'Authorization': sessionStorage.getItem('basic_key')
        }),
        withCredentials: true,
        observe: 'response' as 'response'
      }
      return this.http.get(this.baseUrl + endPoint, httpOptions);
    }
  }
}
