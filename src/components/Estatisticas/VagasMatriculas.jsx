import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { listarVagasMatriculasSerie } from "../../services/estatisticas";

export default class VagasMatriculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vagasMatriculasSerie: [],
      totaisTurmas: 0,
      totaisVagasOferecidas: 0,
      totaisAtendimentos: 0,
      totaisVagasRemanecentes: 0,
      totaisMediaAtendimento: 0,
      referencia: ""
    }
  }

  componentDidMount() {
    listarVagasMatriculasSerie({ codesc: this.props.codesc }).then(lista => {
      this.setState({ vagasMatriculasSerie: lista.results });
      if (lista.results.length > 0) {
        lista.results.forEach((vaga) => {
          this.setState({ totaisTurmas: this.state.totaisTurmas + vaga.total_turmas });
          this.setState({ totaisVagasOferecidas: this.state.totaisVagasOferecidas + vaga.vagas_oferecidas });
          this.setState({ totaisAtendimentos: this.state.totaisAtendimentos + vaga.atendimentos });
          this.setState({ totaisVagasRemanecentes: this.state.totaisVagasRemanecentes + vaga.vagas_remanecentes });
          this.setState({ totaisMediaAtendimento: this.state.totaisMediaAtendimento + vaga.media_atendimento });
        });
      }
    });
    this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Vagas e Matrículas Por Série</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faIdCard} className="cor-azul" />
            <div className="ml-3 fonte-14">Vagas e Matrículas</div>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover table-bordered mb-0 fonte-14">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Total de Turmas</th>
                  <th scope="col">Vagas Oferecidas</th>
                  <th scope="col">Vagas Atendidas</th>
                  <th scope="col">Vagas Remanescentes</th>
                  <th scope="col">Média Atendimentos/Turma</th>
                </tr>
              </thead>
              <tbody>
                {this.state.vagasMatriculasSerie.length > 0 ? (
                  this.state.vagasMatriculasSerie.map((vagaMatricula, indice) => {
                    return (
                      <tr key={indice}>
                        <td className="font-weight-bold">{vagaMatricula.serie}</td>
                        <td className="text-center">{vagaMatricula.total_turmas}</td>
                        <td className="text-center">{vagaMatricula.vagas_oferecidas}</td>
                        <td className="text-center">{vagaMatricula.atendimentos}</td>
                        <td className="text-center">{vagaMatricula.vagas_remanecentes}</td>
                        <td className="text-center">{vagaMatricula.media_atendimento}</td>
                      </tr>
                    );
                  })
                ) : (null)}
                {this.state.vagasMatriculasSerie.length > 0 ? (
                  <tr>
                    <td></td>
                    <td className="text-center table-secondary font-weight-bold">{this.state.totaisTurmas}</td>
                    <td className="text-center table-secondary font-weight-bold">{this.state.totaisVagasOferecidas}</td>
                    <td className="text-center table-secondary font-weight-bold">{this.state.totaisAtendimentos}</td>
                    <td className="text-center table-secondary font-weight-bold">{this.state.totaisVagasRemanecentes}</td>
                    <td className="text-center table-secondary font-weight-bold">{this.state.totaisMediaAtendimento}</td>
                  </tr>
                ) : (null)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
