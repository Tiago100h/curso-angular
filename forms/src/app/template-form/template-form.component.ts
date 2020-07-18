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
    this.httpClient
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados => console.log(dados));
  }

  consultaCEP(cep, form) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        
        this.resetaDadosForm(form);

        //Consulta o webservice viacep.com.br/
        this.httpClient
          .get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => { this.populaDadosForm(dados, form) });

      }
    }
  }

  populaDadosForm(dados, formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
