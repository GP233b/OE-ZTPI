import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneticAlgorithmRequest } from '../../models/genetic-algorithm-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  public runGeneticAlgorithm(data: GeneticAlgorithmRequest): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/run', data, {responseType: 'json'});
  }

}
