import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./datepicker.component.scss'],
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent {
  usersSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      username: {
        title: 'Имя пользователя',
        type: 'string',
      },
      userId: {
        title: 'Айди',
        type: 'number',
      },
      registrationDate: {
        title: 'Дата регистрации',
        type: 'string',
      },
      countOfPurchases: {
        title: 'Кол-во покупок',
        type: 'number',
      },
    },
  };

  usersSource: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    this.http.get<any>(`http://${envimorent.apiUrl}:4615/users`).subscribe(res => {
      this.usersSource.load(res);
    });
  }
}
