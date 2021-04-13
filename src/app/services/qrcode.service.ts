import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QrCode } from '../_interfaces/QrCode';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  //Pega os QR Codes cadastrados
  getQrcode():Observable<any>{
   return this.http.get<any>(`${this.baseUrl}/qrcode`);
  }

  //Salva o QR Code
  postQrcode(qrcode: QrCode){
    return this.http.post(`${this.baseUrl}/qrcode`, qrcode);
  }

  //Edita o QR Code
  putQrcode(id: number, qrcode: QrCode){
    return this.http.put(`${this.baseUrl}/qrcode/${id}`, qrcode);
  }

  //Deleta o QR Code
  deleteQrcode(id: number){
    return this.http.delete(`${this.baseUrl}/qrcode/${id}`);
  }

  //Método para favoritar
  favoriteQrcode(id: number, qrcode: QrCode){
    return this.http.post(`${this.baseUrl}/favorite/${id}`, qrcode);
  }
}
