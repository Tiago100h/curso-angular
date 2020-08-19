import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => this.updateForm(curso))
    //   }
    // );

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
    )
    .subscribe(curso => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

  }

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Curso criado com sucesso!')
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
        () => console.log('request complet')
      );
    }
  }
  
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
