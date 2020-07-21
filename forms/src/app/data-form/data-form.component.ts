import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl(null)
    //   })
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.min(3), Validators.max(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.formulario);

    this.httpClient
      .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        // this.resetar();
      },
        (error: any) => alert('erro'));
  }

  resetar() {
    // reseta o form
    this.formulario.reset();
  }

  campoComErro(campo: string) {
    return this.formulario.get(campo).touched && !this.formulario.get(campo).valid;
  }
  
  campoObrigatorioInvalido(campo: string) {
    const campoControl = this.formulario.get(campo);
    return campoControl.touched && campoControl.errors && campoControl.errors['required'];
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

}
