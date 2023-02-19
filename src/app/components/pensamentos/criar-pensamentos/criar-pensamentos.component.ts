import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  }

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['Formulário reativo'],
      autoria: [''],
      modelo: ['modelo1']
    })
  }

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

}
