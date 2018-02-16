const { BaseService } = require('oi-node-api-framework');
const consultarDadosOSAgendamentoSoap = require('../../../integration/soap/consultar-dados-os-agendamento-soap');
const moment = require('moment');

class AgendamentoService extends BaseService {
    constructor() {
        super({
            module: 'Agendamento Service'
        });
        this.integration = {
            consultarDadosOSAgendamentoSoap
        };

        moment.locale('pt-BR');
    }

    carregar(cpf, ddd, terminal) {
        return new Promise((resolve, reject) => {
            this.integration.consultarDadosOSAgendamentoSoap.carregarAgendamentos(cpf, ddd, terminal)
                .then((dadosAgendamento) => {
                    // deixa no objeto apenas as propriedades necessárias para exibição
                    const resumo = dadosAgendamento.map((item) => {
                        const inicio = moment(item.DadosAgendamento.dataHoraInicioAtividade);
                        const fim = moment(item.DadosAgendamento.dataHoraFimAtividade);

                        return {
                            contrato: item.contrato,
                            data: inicio.format('L'),
                            diaSemana: inicio.format('dddd'),
                            turno: (inicio.format('H') > 12) ? 'Tarde' : 'Manhã',
                            periodo: `${inicio.format('H')}:${inicio.format('mm')} - ${fim.format('H')}:${fim.format('mm')}`,
                            numeroDoPedido: item.DadosOS.documentoAssociado
                        };
                    });

                    resolve(resumo);
                })
                .catch(reject);
        });
    }
}

module.exports = new AgendamentoService();
