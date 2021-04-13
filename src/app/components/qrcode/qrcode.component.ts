import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { QrcodeService } from 'src/app/services/qrcode.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  //Variáveis
  qrcodeForm: FormGroup;
  qrcode: any;

  //Variáveis do QR Code
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  constructor(private router: Router, private fb: FormBuilder, private qrService: QrcodeService) { }

  ngOnInit(): void {
    this.validation();
  }

  //Validação do formulário de alterar QR Code
  validation(){
    this.qrcodeForm = this.fb.group({
      value: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  //Salva o QR Code
  saveQrcode(){
    if(this.qrcodeForm.valid){
      this.qrcode = Object.assign({}, this.qrcodeForm.value);

      this.qrService.postQrcode(this.qrcode).subscribe(
        () => {
          console.log('QR Code salvo!');
          window.location.reload();
        }, error => {
          console.log(error.error);
        }
      )
    }
  }

  

}
