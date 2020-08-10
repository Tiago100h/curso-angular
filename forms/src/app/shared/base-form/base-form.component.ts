import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    // reseta o form
    this.formulario.reset();
  }

  campoObrigatorioInvalido(campo: string) {
    const campoControl = this.formulario.get(campo);
    return campoControl.touched && campoControl.errors && campoControl.errors['required'];
  }

  campoComErro(campo: string) {
    return this.formulario.get(campo).touched && !this.formulario.get(campo).valid;
  }

  emailInvalido() {
    const campoEmail = this.formulario.get('email');
    return campoEmail.touched && campoEmail.errors && campoEmail.errors['email'];
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.campoComErro(campo)
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

}
