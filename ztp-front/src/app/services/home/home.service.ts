import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneticAlgorithmRequest } from '../../models/genetic-algorithm-request.model';
import { Observable } from 'rxjs';
import { GeneticAlgorithmResponse } from '../../models/genetic-algorithm-response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  public runGeneticAlgorithm(data: GeneticAlgorithmRequest): Observable<GeneticAlgorithmResponse> {
    return this.http.post<GeneticAlgorithmResponse>('http://localhost:5000/api/run', data);
  }

}
