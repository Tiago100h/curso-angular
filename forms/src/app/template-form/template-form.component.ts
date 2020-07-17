import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  campoComErro(campo) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.campoComErro(campo)
    }
  }

  onSubmit(form) {
    console.log(form);
    console.log(this.usuario);
  }

  consultaCEP(cep) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        //Consulta o webservice viacep.com.br/
        this.httpClient.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => {console.log(dados)});
        
      }
    }
  }

}
