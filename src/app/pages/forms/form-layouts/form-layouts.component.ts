import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent {
  usersSettings = {
    actions: {
      edit: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      promo: {
        title: 'Имя промокода',
        type: 'string',
      },
      increaseValue: {
        title: 'Бонусы',
        type: 'number',
      },
    },
  };

  usersSource: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    this.http.get<any>(`http://${envimorent.apiUrl}:4615/promocode`).subscribe(res => {
      this.usersSource.load(res);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      this.http.delete<any>(`http://${envimorent.apiUrl}:4615/promocode`, {params: event.data, responseType: 'blob' as 'json'})
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Вы точно хотите создать данную запись?')) {
      this.http.post<any>(`http://${envimorent.apiUrl}:4615/promocode`, {}, { params: event.newData, responseType: 'blob' as 'json' })
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
