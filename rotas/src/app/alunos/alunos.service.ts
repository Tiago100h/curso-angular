import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  
  private alunos = [
    { id: 1, nome: 'Aluno 01', email: 'aluno01@email.com'},
    { id: 2, nome: 'Aluno 02', email: 'aluno02@email.com'},
    { id: 3, nome: 'Aluno 03', email: 'aluno03@email.com'}
  ]
  
  getAlunos() {
    return this.alunos;
  }
  
  getAluno(id: number): any {
    const alunos = this.getAlunos();
    for (const aluno of alunos) {
      if (aluno.id == id) {
        return aluno
      }
    }
    return null;
  }

  constructor() { }
}