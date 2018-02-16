const { BaseSoap, config } = require('oi-node-api-framework');
const util = require('util');

class ConsultarDadosOSAgendamentoSoap extends BaseSoap {
    constructor() {
        super({
            module: 'Consultar Dados OS Agendamento Soap'
        });
        this.config = config;
    }
    carregarAgendamentos(cpf, ddd, terminal) {
        const base = this;

        const args = {
            $xml: `<esb:Ator>
            <esb:nomeSolicitante>Portal Oi</esb:nomeSolicitante>
            <esb:sistema>Portal Oi</esb:sistema>
         </esb:Ator>
         <v1:GrupoRequest>
            <v1:ddd>${ddd || ''}</v1:ddd>
            <v1:telefone>${terminal || ''}</v1:telefone>
            <v1:cpfcnpj>${cpf || ''}</v1:cpfcnpj>
         </v1:GrupoRequest>`
        };

        return new Promise((resolve, reject) => {
            this.log.debug(`Chamando o serviço consultarDadosOSAgendamentoSoap [${this.config.soap.consultarDadosOSAgendamentoSoap.endpoint}] [${cpf}] [${ddd}] [${terminal}]`);

            this.soap.createClientAsync(this.config.soap.consultarDadosOSAgendamentoSoap.wsdl, this.config.soap.consultarDadosOSAgendamentoSoap.endpoint)
                .then((soapClient) => {
                    soapClient.ConsultarDadosOSAgendamentoRequestAsync(args)
                        .then((resposta) => {
                            resolve(resposta.GrupoResponse.filter(item => item.contrato));
                        })
                        .catch(reject);

                    base.log.debug(`Ultimo request realizado para o [${cpf}] [${ddd}] [${terminal}]`, soapClient.lastRequest);
                })
                .catch(reject);
        });
    }
}

module.exports = new ConsultarDadosOSAgendamentoSoap();
