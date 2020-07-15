import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {

    constructor(private alunosService: AlunosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Aluno | import("rxjs").Observable<Aluno> | Promise<Aluno> {
        console.log('AlunoDetalheResolver');
        const id = route.params['id'];
        return this.alunosService.getAluno(id);
    }

}