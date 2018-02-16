const { applicationError, BaseController } = require('oi-node-api-framework');
const agendamentoService = require('./service/agendamento-service');

class AgendamentoController extends BaseController {
    constructor() {
        super({
            module: 'Agendamento Controller'
        });
        this.service = agendamentoService;
    }

    carregar(req, res, next) {
        super.activateRequestLog(req);

        const cpf = req.headers['x-cpf'];
        const { ddd, terminal } = req.params;

        this.log.debug(`Carregando os agendamentos [${cpf}] [${ddd}] [${terminal}]`);

        if (!cpf) {
            return next(applicationError.throw('Campos obrigatórios não preenchidos. [carregar]', 'BadRequestError'));
        }

        return this.service.carregar(cpf, ddd, terminal)
            .then((agendamentos) => {
                this.log.debug(`Os agendamentos foram carregados com sucesso [${cpf}] [${ddd}] [${terminal}]`, agendamentos);
                res.send(200, agendamentos);
                return next();
            })
            .catch(erro => next(applicationError.throw(erro)));
    }
}

module.exports = new AgendamentoController();
