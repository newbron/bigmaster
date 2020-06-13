import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  usersSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      buyerUsername: {
        title: 'Имя покупателя',
        type: 'string',
      },
      buyerId: {
        title: 'Айди покупателя',
        type: 'number',
      },
      date: {
        title: 'Дата покупки',
        type: 'string',
      },
      price: {
        title: 'Цена',
        type: 'number',
      },
      response: {
        title: 'Описание',
        type: 'string',
      },
    },
  };

  usersSource: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    this.http.get<any>(`http://${envimorent.apiUrl}:4615/history`).subscribe(res => {
      this.usersSource.load(res);
    });
  }
}
