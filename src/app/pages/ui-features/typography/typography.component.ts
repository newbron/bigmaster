import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-typography',
  styleUrls: ['./typography.component.scss'],
  templateUrl: './typography.component.html',
})
export class TypographyComponent {
  statisticObject = {};

  constructor(private http: HttpClient) {
    this.http.get<any>(`http://${envimorent.apiUrl}:4615/statistics`).subscribe(res => {
      this.statisticObject = res;
    });
  }

  roundNumber(number: number) {
    return Math.round(number);
  }

  transformStock(stock: any[]) {
    return stock.filter(Boolean).length;
  }
}
