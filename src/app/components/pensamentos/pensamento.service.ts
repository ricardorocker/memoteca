import { Pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let parametros = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina);

    if (filtro.trim().length > 1) {
      parametros = parametros.set("q", filtro);
    }

    return this.http.get<Pensamento[]>(this.API, { params: parametros });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;

    // const url = `${this.API}/${pensamento.id}`;
    // return this.http.put<Pensamento>(url, pensamento);

    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

}
