import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moment } from '../Moment';
import { Response } from '../Response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

getMoments() : Observable<Response<Moment[]>>{
return this.http.get<Response<Moment[]>>(this.apiUrl);
}

getMoment(id : number) : Observable<Response<Moment>>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Response<Moment>>(url);
  }


createMoment(fromData: FormData): Observable<FormData>{
    
  return this.http.post<FormData>(this.apiUrl,fromData);

}

removeMoment(id: number){
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete(url);
}

updateMoment(id: number, formData: FormData): Observable<FormData>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<FormData>(url,formData);
}

}
