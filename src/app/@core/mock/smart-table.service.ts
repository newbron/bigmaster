import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmartTableData } from '../data/smart-table';
import envimorent from '../../../../env';

@Injectable()
export class SmartTableService {
  constructor(private http: HttpClient) {
  }

  data: any = [];

  getData() {
    return this.http.get(`http://${envimorent.apiUrl}:4615/places`).toPromise()
      .then(res => this.data = res);
  }
}
