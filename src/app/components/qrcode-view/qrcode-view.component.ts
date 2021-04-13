import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { QrcodeService } from 'src/app/services/qrcode.service';

@Component({
  selector: 'app-qrcode-view',
  templateUrl: './qrcode-view.component.html',
  styleUrls: ['./qrcode-view.component.scss']
})
export class QrcodeViewComponent implements OnInit {

  //Variáveis
  qrcodeView: any;
  qrcode: any;
  qrId: number;
  editForm: FormGroup;

  //Variáveis do QR Code
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;

  constructor(private qrService: QrcodeService, private modalService: NgbModal, private fb: FormBuilder, private actRoute: ActivatedRoute) {
    this.actRoute.params.subscribe(params => this.qrId = params['id']);
  }

  ngOnInit(): void {
    this.getQrcode();
    this.validationEdit();
  }

  //Abre o modal
  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit'});
  }

  //Fecha o modal
  closeModal(){
    this.modalService.dismissAll();
  }

  //Pega o Qr Code
  getQrcode(){
    this.qrService.getQrcode().subscribe(
      (res) => {
        this.qrcodeView = res.reverse();
      }, error => {
        console.log(error.error);
      }
    )
  }

  //Validação dos campos do form de alterações
  validationEdit(){
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    })
  }
  
  //Edita o QR Code
  editQrcode(){
    if(this.editForm.valid){
      this.qrcode = Object.assign({}, this.editForm.value);

      this.qrService.putQrcode(this.qrId, this.qrcode).subscribe(
        () => {
          console.log('QR Code editado!');
          window.location.reload();
        }, error => {
          console.log(error.error);
        }
      )
    }
    else{
      console.log('Não foi possível editar o QR Code, verifique se os campos estão preenchidos');
    }

  }

  //Deleta os QR Codes adicionados
  deleteQrcode(id: number){
    this.qrService.deleteQrcode(id).subscribe(
      () => {
        console.log('QR Code deletado!');
        window.location.reload();
        this.closeModal();
      }, error => {
        console.log(error.error);
      }
    )
  }

}
