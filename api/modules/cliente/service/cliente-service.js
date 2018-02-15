const { BaseService } = require('oi-node-api-framework');
const repository = require('../repository/cliente-repository');

class ClienteService extends BaseService {
    constructor() {
        super({
            module: 'Cliente Service'
        });
        this.repository = repository;
    }

    carregarPorNome(nome) {
        return this.repository.carregarPorNome(nome);
    }
}

module.exports = new ClienteService();
