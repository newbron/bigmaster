import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { HttpClient } from '@angular/common/http';
import { SmartTableData } from '../../../@core/data/smart-table';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      city: {
        title: 'Город',
        type: 'string',
      },
      areas: {
        title: 'Районы (Через запятую)',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    this.service.getData().then(res => {
      this.source.load(res);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      this.http.delete<any>(`http://${envimorent.apiUrl}:4615/places`, {params: event.data, responseType: 'blob' as 'json'})
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Вы точно хотите отредактировать данную запись?')) {
      const summaryData = {
        old: JSON.stringify(event.data),
        new: JSON.stringify(event.newData),
      };
      this.http.put<any>(`http://${envimorent.apiUrl}:4615/places`, {}, { params: summaryData, responseType: 'blob' as 'json' })
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Вы точно хотите создать данную запись?')) {
      this.http.post<any>(`http://${envimorent.apiUrl}:4615/places`, {}, { params: event.newData, responseType: 'blob' as 'json' })
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
