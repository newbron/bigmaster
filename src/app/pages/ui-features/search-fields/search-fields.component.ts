import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import envimorent from '../../../../../env';

@Component({
  selector: 'ngx-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.scss'],
})
export class SearchComponent {
  constructor (private http: HttpClient) {
    this.http.get<any>(`http://${envimorent.apiUrl}:4615/easyPayApiUrl`, { responseType: 'text' as 'json'}).subscribe(res => {
      this.easyPayApiUrl = res;
    });
  }

  responseMessageEasyPay: string;
  responseMessageGlobalMoney: string;
  easyPayApiUrl: string;

  updateEasyPay(login: string, password: string) {
    if (login.trim() && password.trim()) {
      return this.http.post<any>(`${this.easyPayApiUrl}/setCredentials`, {}, {
        params: { login: login, password: password },
        responseType: 'blob' as 'json',
      }).subscribe(() => {
        this.responseMessageEasyPay = '✅ Новые данные применены корректно!';
      });
    }
    this.responseMessageEasyPay = '❌ Одно из полей отсутвует! Пожалуйста, убедитесь, что всё заполнено корректно.';
  }

  updateGlobalMoney(login: string, password: string) {
    if (login.trim() && password.trim()) {
      return this.http.post<any>(`${this.easyPayApiUrl}/setCredentialsGlobalMoney`, {}, {
        params: { login: login, password: password },
        responseType: 'blob' as 'json',
      }).subscribe(() => {
        this.responseMessageGlobalMoney = '✅ Новые данные применены корректно!';
      });
    }
    this.responseMessageGlobalMoney = '❌ Одно из полей отсутвует! Пожалуйста, убедитесь, что всё заполнено корректно.';
  }
}
