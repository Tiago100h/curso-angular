import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}
